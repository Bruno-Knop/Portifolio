
/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, Router } from '@angular/router';
import { StorageService } from './../storageService.service';
import { AuthService } from '../authentication/auth-service.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad{

  constructor(
    private router: Router,
    private service: StorageService,
    private auth: AuthService
    ) {}

  private async verificarAcesso() {
    if (await this.service.getToken().then(res => res) && await this.auth.validateToken().then(retorno => retorno)) {
      return true;
    } else {
      this.router.navigate(['Login']);
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
