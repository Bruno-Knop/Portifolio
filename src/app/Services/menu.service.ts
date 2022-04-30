import { Injectable, EventEmitter } from '@angular/core';
import { StorageService } from './storageService.service';

@Injectable()
export class MenuService {
  emmitMenuToggleChange = new EventEmitter<boolean>();
  emmitDarkModeToggleChange = new EventEmitter<boolean>();
  private menuToggle = true;

  constructor(private service: StorageService) { }

  getToggle(): boolean {
    return this.menuToggle;
  }

  setToggle(toggle: boolean): void {
    this.menuToggle = toggle;
    this.emmitMenuToggleChange.emit(toggle);
  }

  async toggleThemeDark(bool: boolean) {
    if(bool){
      this.service.setDarkMode(bool);
      document.body.setAttribute('color-theme', 'dark');
    } else {
      this.service.setDarkMode(bool);
      document.body.setAttribute('color-theme', 'light');
    };
    this.emmitDarkModeToggleChange.emit(bool);
  };
}
