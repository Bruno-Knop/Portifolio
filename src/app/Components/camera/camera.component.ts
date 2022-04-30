import { LocalFileInterface } from './../../Interfaces/camera.interface';
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, Input, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ActionSheetController } from '@ionic/angular';
import { CameraService } from 'src/app/Services/camera.service';
import { ControllService } from 'src/app/Services/controller.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent implements OnInit {
  @Input() uploadButton: boolean;
  @Input() deleteButton: boolean;

  images: LocalFileInterface[] = [];

  constructor(
    private cameraService: CameraService,
    private controller: ControllService,
    private actionSheetController: ActionSheetController
    ) {
      this.uploadButton = true;
      this.deleteButton = true;
    }

  async ngOnInit() {
    this.cameraService.EmmitImagesChange.subscribe((value) => {
      this.images = value;
    });
    await this.cameraService.removeAllFiles();
  };

  async loadFiles() {
    const loading = await this.controller.loadingController('Loading data...');
    await loading.present();

    await this.cameraService.loadImagens(loading);
    console.log(this.images);
  };

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Selecione Imagem',
      buttons: [{
              text: 'Carregar partir da galeria',
              icon: 'image',
              handler: () => {
                  this.takePicture(CameraSource.Photos);
              }
          },
          {
              text: 'Usar Camera',
              icon: 'camera',
              handler: () => {
                  this.takePicture(CameraSource.Camera);
              }
          }
      ]
    });
    await actionSheet.present();
  };

  private async takePicture(source: CameraSource){
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      correctOrientation: true,
      resultType: CameraResultType.Uri,
      source
    });

    if (image) {
      const loading = await this.controller.loadingController('Loading data...');
      await loading.present();

      await this.cameraService.saveImage(image, loading);
    };
  }

  async upload(file: LocalFileInterface) {
    const dataUpload = await this.cameraService.fileUpload(file).then((retorno) => retorno);
    if(dataUpload.success){
      this.deleteImg(file);
    } else {
      this.controller.toastControllerBottom(dataUpload.message);
    };
  };


  async deleteImg(file: LocalFileInterface) {
    await this.cameraService.deleteImage(file);
    this.controller.toastControllerBottom('Imagem deletada com sucesso!');
  };
}
