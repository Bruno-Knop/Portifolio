import { MenuService } from 'src/app/Services/menu.service';
import { MenuModule } from '../../Components/menu/menu.module';
import { HeaderModule } from '../../Components/header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { MainPage } from './main.page';

import { MainPageRoutingModule } from './main-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainPageRoutingModule,
    HeaderModule,
    MenuModule
  ],
  providers: [MenuService],
  declarations: [MainPage]
})
export class MainPageModule {}
