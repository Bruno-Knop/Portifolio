import CryptoJS from 'crypto-js';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EncryptService {
  private keyCrypt = 'encriptedKey';

  async encrypt(value: any) {
    return CryptoJS.AES.encrypt(value, this.keyCrypt).toString();
  };

  async decrypt(value: any) {
    return await CryptoJS.AES.decrypt(value, this.keyCrypt).toString(CryptoJS.enc.Utf8);
  };

  async encryptJSON(value: any) {
    return CryptoJS.AES.encrypt(JSON.stringify(value), this.keyCrypt).toString();
  };

  async decryptJSON(value: any) {
    return await JSON.parse(CryptoJS.AES.decrypt(value, this.keyCrypt).toString(CryptoJS.enc.Utf8));
  };
}
