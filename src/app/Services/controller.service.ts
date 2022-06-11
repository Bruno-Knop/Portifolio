import { Injectable } from '@angular/core';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class ControllService {

  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private lodCtrl: LoadingController
  ) { }

  navigate(nav: string){
    this.navCtrl.navigateRoot([nav]);
  };

  navigateLogin(){
    this.navCtrl.navigateRoot(['/login']);
  };

  navigateHome(){
    this.navCtrl.navigateRoot(['/main/home']);
  };

  navigateDashboard() {
    this.navCtrl.navigateRoot(['/main/dashboard']);
  };

  async toastControllerTop(sMsg: string){
    const toast = await this.toastCtrl.create({
      message: sMsg,
      duration: 1500,
      position: 'top'
    });
    toast.present();
  };

  async toastControllerBottom(sMsg: string){
    const toast = await this.toastCtrl.create({
      message: sMsg,
      duration: 1500,
      position: 'bottom'
    });
    toast.present();
  };

  async alert(sCss: string, sHeader: string, sMsg: string, sButtons: any) {
    const alert = await this.alertCtrl.create({
      cssClass: sCss,
      header: sHeader,
      message: sMsg,
      buttons: sButtons
    });
    return await alert.present();
  };

  async loadingController(mensagem: string){
    const loading = await this.lodCtrl.create({
      cssClass: 'my-custom-class',
      message: mensagem
    });
    await loading.present();

    return loading;
  };
}
