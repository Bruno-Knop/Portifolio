import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ScrollbarThemeModule } from 'src/app/Directive/ScrollbarTheme.directive';

import { MenuComponent } from './menu.component';


@NgModule({
  declarations: [MenuComponent],
  imports: [
    IonicModule,
    CommonModule,
    RouterModule,
    ScrollbarThemeModule
  ],
  exports: [MenuComponent]
})
export class MenuModule { }
