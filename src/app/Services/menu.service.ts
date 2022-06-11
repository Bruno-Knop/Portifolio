import { Injectable, EventEmitter } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable()
export class MenuService {
  emmitMenuToggleChange = new EventEmitter<boolean>();
  private menuToggle = true;

  constructor() { }

  getToggle(): boolean {
    return this.menuToggle;
  }

  setToggle(toggle: boolean): void {
    this.menuToggle = toggle;
    this.emmitMenuToggleChange.emit(toggle);
  };

}
