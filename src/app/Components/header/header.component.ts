import { MenuService } from './../../Services/menu.service';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  toggle = true;
  darkmode = false;
  badgeView = false;

  constructor(private menuService: MenuService) { }

  ngOnInit() {}

  drawerToggle(){
    this.toggle = this.toggle === true ? false : true;
    this.menuService.setToggle(this.toggle);
  }
}
