import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { DatePickerModule } from '../datePicker/datePicker.module';
import { SelectAllDirectiveModule } from '../../Directive/selectAll-button.directive';
import { FiltrosComponent } from './filtros.component';



@NgModule({
  declarations: [FiltrosComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DatePickerModule,
    SelectAllDirectiveModule
  ],
  exports: [FiltrosComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FiltrosModule { }
