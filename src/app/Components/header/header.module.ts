import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from './header.component';



@NgModule({
  declarations: [HeaderComponent],
  imports: [
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
