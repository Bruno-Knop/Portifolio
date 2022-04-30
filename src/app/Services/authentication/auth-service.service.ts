import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { format } from 'date-fns';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ControllService } from '../controller.service';
import { EncryptService } from '../encrypt.service';
import { HttpService } from '../http.service';
import { StorageService } from '../storageService.service';

/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-unused-labels */
/* eslint-disable @typescript-eslint/naming-convention */
const API = environment.api;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loadingBar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public authState = new BehaviorSubject(false);

  constructor(private controller: ControllService,
              private encrypt: EncryptService,
              private http: HttpService,
              private service: StorageService,
              private platform: Platform
              ) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });

  };

  async Login(value: any) {
    const dateTime = new Date();
    const result = await this.http.post('usuarios/Login', value).then(result => result).catch(()=> ({success: null}));
    const cryptSenha = await this.encrypt.encrypt(value.senha);

    if(result.success) {
      await this.service.setToken(result.data.accessToken);

      await this.http.get(`usuarios/Name/${value.usuario}`).then((retorno) => {
        retorno.data.senha = cryptSenha;
        this.service.setUser(retorno.data);
        this.service.setExpireToken(format(dateTime.setDate(dateTime.getDate()+1), 'MM/dd/yyyy'));
        this.authState.next(true);
      }).catch((err) => err);

      return result.success;
    } else {
      return result.success;
    };
  };

  async loginOffline(value: any) {
    if(await this.service.getUser().then((res) => res) !== null){
      const storageRetorno =  await this.service.getUser().then((res) => res);
      const senha =  await this.encrypt.decrypt(storageRetorno.senha);

      if(storageRetorno.usuario === value.usuario && senha === value.senha){
        delete value.senha;
        this.service.setToken(await this.encrypt.encryptJSON(storageRetorno).then((res) => res));
        return true;
      } else {
        return false;
      };
    } else {
      return null;
    };
  };

  async validateToken() {
      const dataFormatada = new Date();
      const expiracaoToken = new Date(String(await this.service.getExpireToken().then(retorno => retorno)));

      expiracaoToken.setDate(expiracaoToken.getDate());
      const differenceInDays = Math.floor((dataFormatada.getTime() - expiracaoToken.getTime()) / (1000 * 3600 * 24));

      if(differenceInDays === 0){
        return await this.refreshToken().then(retorno => retorno);
      } else {
        if(differenceInDays > -1){
          localStorage.clear();
          return false;
        } else {
          return true;
        };
      };
  };

  async refreshToken() {
    const dateTime = new Date();
    return await this.http.post('usuarios/refresh-token', {})
    .then(retorno =>{
      if(retorno.success){
        this.service.setToken(retorno.data.accessToken);
        this.service.setExpireToken(format(dateTime.setDate(dateTime.getDate()+1), 'MM/dd/yyyy'));
      };
      return true;
    }).catch(() => {this.service.clear(); return false;});
  };

  async resetPassword(value: any){
    let ret: any;
    await this.http.post(`${API}/usuarios/recuperar-senha`, value).then((retorno: any) => {
      if(retorno.success){
        ret = retorno.message;
      };
    });
    return ret;
  };

  async register(value: any, loader: any) {
    // if (this.network.type !== 'none') {
    //   const dateTime = new Date();
    //   const registerArray = {
    //     codigo_empresa: 1,
    //     nome: value.nome,
    //     usuario: value.usuario,
    //     email: value.email,
    //     senha: value.senha,
    //     data: format(dateTime.setDate(dateTime.getDate()+1), 'yyyy-MM-dd HH:MM:SS'),
    //     admin: 0,
    //     ativo: 1
    //   };

    //   await this.http.post('usuarios/insert-user/', registerArray).then((result) => {
    //     this.controller.toastControllerBottom(result.message);
    //     if(result.success){
    //       loader.dismiss();
    //       this.controller.navigateLogin();
    //     } else {
    //       loader.dismiss();
    //       this.controller.toastControllerBottom(result.message);
    //     };
    //   });
    // } else {
    //   this.controller.toastControllerBottom('Necessário possuir conexão com internet!!');
    //   loader.dismiss();
    // };
  };

  async ifLoggedIn() {
    await this.service.getToken().then((response) => {
      if (response) {
        this.authState.next(true);
      }
    });
  }

  isAuthenticated() {
    return this.authState.value;
  }
}

