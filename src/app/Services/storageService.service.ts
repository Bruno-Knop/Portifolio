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

  async setUser(value: string) {
    await this.storage.set(LOGIN, value);
  };

  async getUser() {
    return await this.storage.get(LOGIN);
  };

  removeUser() {
    this.storage.remove(LOGIN);
  };

  async setToken(value: string) {
    await this.storage.set(TOKEN, value);
  };

  async getToken() {
    return await this.storage.get(TOKEN);
  };

  removeToken() {
    this.storage.remove(TOKEN);
  };

  async setExpireToken(value: string) {
    await this.storage.set(EXPIRE, value);
  };

  async getExpireToken() {
    return await this.storage.get(EXPIRE);
  };

  removeExpireToken() {
    this.storage.remove(EXPIRE);
  };

  logout() {
    this.removeToken();
    this.controller.toastControllerBottom('Logout efetuado com sucesso!');
    this.controller.navigateIntro();
  };

};
