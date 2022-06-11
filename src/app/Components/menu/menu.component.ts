import { ControllService } from 'src/app/Services/controller.service';
import { StorageService } from 'src/app/Services/storage.service';
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/authentication/auth-service.service';
import { MenuService } from 'src/app/Services/menu.service';

import { MenuInterface } from './../../Interfaces/menu.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  appPages: MenuInterface[];
  usuario: string;
  codigo: number;
  imgPerfil: string;

  constructor(
    public controller: ControllService,
    private auth: AuthService,
    private storage: StorageService,
    private menu: MenuController,
    private menuService: MenuService
  ) {}

  async ngOnInit() {
    // this.menu.toggle();

    this.menuService.emmitMenuToggleChange.subscribe(() => {
      this.menu.toggle();
    });

    this.auth.emitUser.subscribe((result) => {
      this.usuario = result.nome;
      this.codigo = result.codigo;
      this.imgPerfil = result.imgPerfil;
      this.appPages = result.menu;
    });

    await this.storage.getUser().then(result => {
      this.usuario = result.nome;
      this.codigo = result.codigo;
      this.imgPerfil = result.imgPerfil;
      this.appPages = result.menu;
    });
  };

}
