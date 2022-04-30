import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonDatetime } from '@ionic/angular';
import { format, parseISO } from 'date-fns';

import { DatePickerService } from '../../service/datePicker.service';
import { DatePickerInterface } from './../../models/datePicker.model';

/* eslint-disable @typescript-eslint/member-ordering */
@Component({
  selector: 'app-date-picker',
  templateUrl: './datePicker.component.html',
  styleUrls: ['./datePicker.component.scss'],
})
export class DatePickerComponent implements OnInit {
  @ViewChild(IonDatetime) datetime: IonDatetime;
  @Output() dataValueChange = new EventEmitter();
  //Options
  @Input() usingModel: string;
  @Input() editDateValue: string;
  @Input() modelDatePicker = 'modal';
  @Input() presentation = 'date';

  dataPickerInterface: DatePickerInterface = {
    usingModel: '',
    formattedDateString: ''
  };

  dateValue = `${format(new Date(), 'yyyy-MM-dd')}T${format(new Date(), 'HH:mm:ss')}.000Z`;

  constructor(public dateService: DatePickerService) {
  }

  async ngOnInit() {
    this.dataPickerInterface.usingModel = await this.usingModel;

    const model = await this.presentation;
    switch (model) {
      case 'date-time' || 'time-date':
        this.dataPickerInterface.formattedDateString = format(new Date(), 'HH:mm dd/MM/yyyy');
        if(this.editDateValue !== undefined){
          this.dateValue = this.editDateValue;
        };
        break;
      case 'date':
        this.dataPickerInterface.formattedDateString = format(new Date(), 'dd/MM/yyyy');
        if(this.editDateValue !== undefined){
          const splitData = this.editDateValue.split('/');
          this.dateValue = `${splitData[2]}-${splitData[1]}-${splitData[0]}T${format(new Date(), 'HH:mm:ss')}.000Z`;
        };
        break;
      case 'time':
        this.dataPickerInterface.formattedDateString = format(new Date(), 'HH:mm');
        if(this.editDateValue !== undefined){
          this.dateValue = `yyyy-MM-ddT${this.editDateValue}.000Z`;
        };
        break;
    };

    if(this.editDateValue !== undefined) {
      this.dataPickerInterface.formattedDateString = this.editDateValue;
    };
  };

  dateTimeChange(value: string) {
    this.dateValue = value;
    this.dataPickerInterface.formattedDateString = format(parseISO(value), 'dd/MM/yyyy HH:mm');
    this.dataValueChange.emit(this.dataPickerInterface);
  }

  dateChange(value: string) {
    this.dateValue = value;
    this.dataPickerInterface.formattedDateString = format(parseISO(value), 'dd/MM/yyyy');
    this.dataValueChange.emit(this.dataPickerInterface);
  }

  timeChange(value: string) {
    this.dateValue = value;
    this.dataPickerInterface.formattedDateString = format(parseISO(value), 'HH:mm');
    this.dataValueChange.emit(this.dataPickerInterface);
  }
}
