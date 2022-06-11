/* eslint-disable @typescript-eslint/member-ordering */
import { Time } from '@angular/common';
import { Injectable } from '@angular/core';
import { format } from 'date-fns';

@Injectable({ providedIn: 'root' })
export class DatePickerService {
  currentDate: string | Date;
  formattedDate: string | Date;
  formattedDateISO: string | Date;
  formattedDatePT: string | Date;
  formattedDateISOPT: string | Date;
  formattedDateHoursPT: string | Date;

  formattedHorus: string | Time;

  constructor(){
    this.setToday();
  }

  private setToday() {
    this.currentDate = new Date();
    this.formattedDate = format(new Date(), 'yyyy/MM/dd');
    this.formattedDateISO = `${format(new Date(), 'yyyy-MM-dd')}T${format(new Date(), 'HH:mm:ss')}.000Z`;
    this.formattedHorus = format(new Date(), 'HH:mm');
    this.formattedDatePT = format(new Date(), 'dd/MM/yyyy');
    this.formattedDateISOPT = `${format(new Date(), 'dd/MM/yyyy')}T${format(new Date(), 'HH:mm:ss')}.000Z`;
    this.formattedDateHoursPT = format(new Date(), 'dd/MM/yyyy HH:mm:ss');
  };

  formatDateEN(data: string){
    console.log(data);
    if(data === ''){
      return '';
    }else{
      return `${data.split('/')[2]}-${data.split('/')[1]}-${data.split('/')[0]}`;
    }
  }

  public weekNumber(value: string){
    const currentDate: any = new Date(
      Date.UTC(
        Number(value.split('/', 3)[2]),
        Number(value.split('/', 3)[1])-1,
        Number(value.split('/', 3)[0])
        )
    );
    currentDate.setUTCDate(currentDate.getUTCDate() + 4 - (currentDate.getUTCDay()||7));
    const startDate: any = new Date(Date.UTC(currentDate.getUTCFullYear(),0,1));
    const weekNumber = Math.ceil(( ( (currentDate - startDate) / 86400000) + 1)/7);

    return weekNumber;
  };
};
