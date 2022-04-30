import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerComponent } from './datePicker.component';

@NgModule({
  declarations: [DatePickerComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [DatePickerComponent]
})
export class DatePickerModule { }
