import { EventEmitter, Injectable } from '@angular/core';
import { Photo } from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Platform } from '@ionic/angular';

import { LocalFileInterface } from '../Interfaces/camera.interface';
import { ControllService } from './controller.service';
import { HttpService } from './http.service';

/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
const IMAGE_DIR = 'stored-images';
const ENDPOINT_UPLOAD= 'uploads';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  private images: LocalFileInterface[] = [];
  EmmitImagesChange = new EventEmitter<LocalFileInterface[]>();

  constructor(
    private http: HttpService,
    private controller: ControllService,
    private plt: Platform
  ) { }

  async loadImagens(loading: HTMLIonLoadingElement) {
    this.images = [];
    Filesystem.readdir({
      path: IMAGE_DIR,
      directory: Directory.Data,
    }).then(async (result) => {
      for (const name of result.files) {
        const filePath = `${IMAGE_DIR}/${name}`;

        const readFile = await Filesystem.readFile({
          path: filePath,
          directory: Directory.Data,
        });

        this.images.push({
          name,
          path: filePath,
          data: `data:image/jpeg;base64,${readFile.data}`,
        });
      };
    },
      async (err) => {
        // Folder does not yet exists!
        await Filesystem.mkdir({
          path: IMAGE_DIR,
          directory: Directory.Data,
        });
      }
    ).then(_ => {
      loading.dismiss();
    });
    this.EmmitImagesChange.emit(this.images);
  };

  async saveImage(photo: Photo, loading: HTMLIonLoadingElement) {
    const base64Data = await this.readAsBase64(photo);

    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
        path: `${IMAGE_DIR}/${fileName}`,
        data: base64Data,
        directory: Directory.Data
    });

    // Reload the file list
    // Improve by only loading for the new image and unshifting array!
    return await this.loadImagens(loading);
  };

  private async readAsBase64(photo: Photo) {
    if (this.plt.is('hybrid')) {
        const file = await Filesystem.readFile({
            path: photo.path
        });

        return file.data;
    }
    else {
        // Fetch the photo, read as a blob, then convert to base64 format
        const response = await fetch(photo.webPath);
        const blob = await response.blob();

        return await this.convertBlobToBase64(blob) as string;
    };
  };

// Helper function
  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  async fileUpload(file: LocalFileInterface) {
    const loading = await this.controller.loadingController('Uploading image...');
    await loading.present();

    const blob = await (await fetch(file.data)).blob();
    const formData = new FormData();
    formData.append('photo', blob, file.name);
    return await this.uploadData(formData, loading);
  };

  async filesUploads(file: LocalFileInterface) {
    const loading = await this.controller.loadingController('Uploading image...');
    await loading.present();

    const blob = await (await fetch(file.data)).blob();
    const formData = new FormData();
    formData.append('photo', blob, file.name);
    return await this.uploadData(formData, loading);
  };

  private async uploadData(formData: FormData, loading: HTMLIonLoadingElement) {
    return await this.http.post(ENDPOINT_UPLOAD, formData)
      .then(retorno => {
          loading.dismiss();
          return retorno;
      });
  };

  async deleteImage(file: LocalFileInterface) {
    const loading = await this.controller.loadingController('Delete image...');
    await loading.present();

    await Filesystem.deleteFile({
        directory: Directory.Data,
        path: file.path
    });

    return await this.loadImagens(loading);
  };

  async removeAllFiles() {
    Filesystem.readdir({
      path: IMAGE_DIR,
      directory: Directory.Data,
    }).then(async (result) => {
      for (const name of result.files) {
        const filePath = `${IMAGE_DIR}/${name}`;

        const readFile = await Filesystem.readFile({
          path: filePath,
          directory: Directory.Data,
        });

        this.deleteImage({
          name,
          path: filePath,
          data: `data:image/jpeg;base64,${readFile.data}`,
        });
      };
    },
      async (err) => {
        // Folder does not yet exists!
        await Filesystem.mkdir({
          path: IMAGE_DIR,
          directory: Directory.Data,
        });
      }
    );
  };
}
