import { EventEmitter, Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { format, formatISO, parseISO } from 'date-fns';
import { BehaviorSubject } from 'rxjs';
import { LoginInterface, ResultLoginInterface } from 'src/app/Interfaces/login.interface';

import { HttpService } from '../http.service';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loadingBar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public authState = new BehaviorSubject(false);
  emitUser = new EventEmitter<LoginInterface>();

  constructor(
    private http: HttpService,
    private service: StorageService,
    private platform: Platform
  ) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
  };

  async login(value: any): Promise<ResultLoginInterface> {
    return await this.http.post('login', value).then(async (result: ResultLoginInterface) => {
      if(result.success) {
        await this.service.setToken(result.data.token);
        await this.service.setUser(result.data);
        await this.service.setExpireToken(formatISO(new Date()));
        this.emitUser.emit(result.data);
        this.authState.next(true);
      };

      return result;
    });
  };

  async validateToken() {
    // const validationInDays = 0;
    // const validationInHours = 8;
    // const newDate = new Date();
    // const expireDate = new Date(parseISO(await this.service.getExpireToken().then(retorno => retorno)));

    // //data e Hora do ultimo login
    // //const expireDay = Number(format(expireDate, 'dd'));
    // //const expireMonth = Number(format(expireDate, 'MM'));
    // //const expireYear = Number(format(expireDate, 'yyyy'));
    // const expireHours = Number(format(expireDate, 'hh'));
    // //const expireMinutes = Number(format(expireDate, 'mm'));
    // //const expireSeconds = Number(format(expireDate, 'ss'));

    // //data e Hora atual
    // // const currentDay = Number(format(newDate, 'dd'));
    // // const currentMonth = Number(format(newDate, 'MM'));
    // // const currentYear = Number(format(newDate, 'yyyy'));
    // const currentHours = Number(format(newDate, 'hh'));
    // // const currentMinutes = Number(format(newDate, 'mm'));
    // // const currentSeconds = Number(format(newDate, 'ss'));

    // if(validationInDays !== 0){
    //   const differenceInDays = Math.floor(
    //     (new Date(expireDate.setDate(expireDate.getDate()+validationInDays)).getTime() - newDate.getTime()) / (1000 * 3600 * 24)
    //   );

    //   if(differenceInDays <= 0){
    //     this.service.removeToken();
    //     return false;
    //   } else {
    //     return true;
    //   };
    // } else {
    //   //this.service.setExpireToken('2022-05-17T11:37:44-03:00');
    //   const differenceInDays = Math.floor((expireDate.getTime() - newDate.getTime()) / (1000 * 3600 * 24));
    //   const diferenceInHours = currentHours - expireHours;

    //   if(differenceInDays === -1){
    //     if(diferenceInHours >= validationInHours){
    //       this.service.removeToken();
    //       return false;
    //     } else {
    //       return true;
    //     };
    //   } else {
    //     this.service.removeToken();
    //     return false;
    //   };
    // };

    return true;
  };

  async ifLoggedIn() {
    await this.service.getToken().then((response) => {
      if (response) {
        this.authState.next(true);
      }
    });
  }
};

