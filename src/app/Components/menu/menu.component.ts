import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonMenu, MenuController } from '@ionic/angular';
import { MenuService } from 'src/app/Services/menu.service';
import { StorageService } from 'src/app/Services/storageService.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Input() appPages = [];

  darkmode = false;
  usuario = '';
  codigo = '';

  constructor(
    private menu: MenuController,
    private menuService: MenuService,
    private service: StorageService
  ) {}

  ngOnInit() {
    this.menu.toggle();

    this.menuService.emmitMenuToggleChange.subscribe((value: boolean) => {
      this.menu.toggle();
    });

    this.menuService.emmitDarkModeToggleChange.subscribe((value: boolean) => {
      this.darkmode = value;
    });
  }

  logout() {
    this.service.logout();
  };
}
