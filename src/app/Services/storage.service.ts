import { LoginInterface } from './../Interfaces/login.interface';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { ControllService } from './controller.service';

//StorageService
const DARKMODE = 'color-theme';

const LOGIN = 'session_login';
const TOKEN = 'session_token';
const EXPIRE = 'expire_token';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(
    private storage: Storage,
    private controller: ControllService,
  ) {
    this.storage.create();
  }

  clear(){
    this.storage.clear();
  };

  async setDarkMode(bool: boolean) {
    await this.storage.set(DARKMODE, bool);
  };

  async getDarkMode() {
    return await this.storage.get(DARKMODE);
  };

  async setUser(value: LoginInterface) {
    await this.storage.set(LOGIN, value);
  };

  async getUser(): Promise<LoginInterface> {
    return await this.storage.get(LOGIN);
  };

  removeUser() {
    this.storage.remove(LOGIN);
  };

  async setToken(token: string) {
    await this.storage.set(TOKEN, token);
  };

  async getToken(): Promise<string> {
    return await this.storage.get(TOKEN);
  };

  removeToken() {
    this.storage.remove(TOKEN);
  };

  async setExpireToken(data: string) {
    await this.storage.set(EXPIRE, data);
  };

  async getExpireToken(): Promise<string> {
    return await this.storage.get(EXPIRE);
  };

  removeExpireToken() {
    this.storage.remove(EXPIRE);
  };

  logout() {
    this.clear();
    this.controller.toastControllerBottom('Logout efetuado com sucesso!');
    this.controller.navigateLogin();
  };

};
