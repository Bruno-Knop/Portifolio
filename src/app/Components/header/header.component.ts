import { ControllService } from 'src/app/Services/controller.service';
import { StorageService } from './../../Services/storage.service';
import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/Services/menu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  darkmode = false;
  badge = 0;
  notifications = [
    {title: 'Info Pendentes', rows: []},
    {title: 'Revisões Pendentes', rows: []},
    {title: 'Atividades Reprovadas', rows: []},
    {title: 'Chamados Respondidos', rows: []},
    {title: 'Chamados Novos', rows: []}
  ];

  constructor(
    public controller: ControllService,
    private service: StorageService,
    private menuService: MenuService
  ) {
    this.notifications.forEach(value => {
      this.badge += value.rows.length;
    });
  };

  async ngOnInit() {
    this.toggleThemeDark(await this.service.getDarkMode().then(result => result));
  }

  drawerToggle(){
    this.menuService.setToggle(true);
  };

  async toggleThemeDark(bool: boolean) {
    if(bool){
      this.service.setDarkMode(bool);
      document.body.setAttribute('color-theme', 'dark');
    } else {
      this.service.setDarkMode(bool);
      document.body.setAttribute('color-theme', 'light');
    };
    this.darkmode = bool;
  };

  logout() {
    this.service.logout();
  };
}
