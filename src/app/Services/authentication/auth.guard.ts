import { ControllService } from 'src/app/Services/controller.service';

/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { AuthService } from '../authentication/auth-service.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad{

  constructor(
    private controller: ControllService,
    private service: StorageService,
    private auth: AuthService
    ) {}

  private async verificarAcesso() {
    if (await this.service.getToken().then(res => res) && await this.auth.validateToken().then(retorno => retorno)) {
      return true;
    } else {
      this.controller.navigateLogin();
      return false;
    };
  }

    async canActivate() {
      return await this.verificarAcesso();
    }

    async canLoad(route: Route) {
      return await this.verificarAcesso();
    }

};
