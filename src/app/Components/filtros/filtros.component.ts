import { Component, Input, OnInit } from '@angular/core';
import { FiltrosService } from 'src/app/Services/filtros.service';
import { TableService } from 'src/app/Services/table.service';

import { DatePickerInterface } from './../../Interfaces/datePicker.interface';
import { DatePickerService } from './../../Services/datePicker.service';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.scss'],
})
export class FiltrosComponent implements OnInit {

  constructor(
    private filtroService: FiltrosService,
    private tableService: TableService,
    private dateService: DatePickerService
    ) {  }

  async ngOnInit() {

  };

  async btnFiltrar(){
    // if (this.status.length > 0){
    //   this.body.codigoStatus = this.cboStatus;
    // };

    // if (this.responsavel.length > 0){
    //   this.body.codigoResponsavel = this.cboResponsavel;
    // };

    // if (this.revisor.length > 0){
    //   this.body.codigoRevisor = this.cboRevisor;
    // };

    // if (this.empresa.length > 0){
    //   this.body.codigoEmpresa = this.cboEmpresa;
    // };

    // if (this.tipoAtividade.length > 0){
    //   this.body.codigoTipoAtividade = this.cboTipoAtividade;
    // };

    // if (this.criador.length > 0){
    //   this.body.codigoCriador = this.cboCriador;
    // };


    // console.log(this.body);
    // this.tableService.setPage(this.endpoint, this.body);
  };

  dataChange(value: DatePickerInterface) {
    //this.body[value.formControlNameModel] = this.dateService.formatDateEN(value.formattedDateString);
  };


}
