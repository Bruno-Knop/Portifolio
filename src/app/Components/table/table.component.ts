import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ColumnMode, TableColumn } from '@swimlane/ngx-datatable';
import { ResultInterface } from 'src/app/Interfaces/result.interface';

import { TableService } from './../../Services/table.service';
import { TableInfoInterface } from './../../Interfaces/tabela.interface';
import { HttpService } from './../../Services/http.service';
import { FiltroInterface } from 'src/app/Interfaces/filtro.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @ViewChild('Table') table: any;
  @Input() namePage: string;
  page: TableInfoInterface = {
      typeTable: 'api',
      offset: 0,
      limit: 10,
      count: 0,
      totalPages: 0,
      header: [
        {
          width: 50,
          resizeable: false,
          name: 'Código',
          prop: 'codigo'
      },
      {
          width: 100,
          resizeable: false,
          name: 'Tipo',
          prop: 'tipoAtividade'
      },
      {
          width: 100,
          resizeable: false,
          name: 'Empresa',
          prop: 'empresa'
      },
      {
          width: 100,
          resizeable: false,
          name: 'Prioridade',
          prop: 'prioridade'
      },
      {
          width: 100,
          resizeable: false,
          name: 'Status',
          prop: 'status'
      }
      ],
      rows: [
        {
          codigo: 39,
          codigoEmpresa: 1,
          empresa: 'ACTI',
          numeroDocumento: 39,
          titulo: 'CRIAR EDITAR',
          descricao: 'CRIAR EDITAR',
          dataCriacao: '25/04/2022',
          codigoDestinacao: 1,
          destinacao: 'SUPORTE',
          codigoResponsavel: 2,
          responsavel: 'Teste1',
          marcador: 'null',
          codigoTipoAtividade: 3,
          tipoAtividade: 'Pessoal',
          solicitante: 'CRIAR EDITAR',
          codigoStatus: 6,
          status: 'CONCLUIDA',
          codigoPrioridade: 2,
          prioridade: 'Média',
          dataPlanejamento: '09/03/2022',
          duracao: 7,
          codigoRevisor: 3,
          revisor: 'Teste3',
          codigoCriador: 1,
          criador: 'Teste'
      },
      {
          codigo: 38,
          codigoEmpresa: 1,
          empresa: 'ACTI',
          numeroDocumento: 38,
          titulo: 'CRIAR EDITAR',
          descricao: 'CRIAR EDITAR',
          dataCriacao: '08/03/2022',
          codigoDestinacao: 1,
          destinacao: 'SUPORTE',
          codigoResponsavel: 3,
          responsavel: 'Teste3',
          marcador: 'null',
          codigoTipoAtividade: 3,
          tipoAtividade: 'Pessoal',
          solicitante: 'CRIAR EDITAR',
          codigoStatus: 12,
          status: 'CANCELADO',
          codigoPrioridade: 2,
          prioridade: 'Média',
          dataPlanejamento: '08/03/2022',
          duracao: 7,
          codigoRevisor: 3,
          revisor: 'Teste3',
          codigoCriador: 1,
          criador: 'Teste'
      },
      {
          codigo: 37,
          codigoEmpresa: 1,
          empresa: 'ACTI',
          numeroDocumento: 37,
          titulo: 'CRIAR EDITAR',
          descricao: 'CRIAR EDITAR',
          dataCriacao: '08/03/2022',
          codigoDestinacao: 1,
          destinacao: 'SUPORTE',
          codigoResponsavel: 3,
          responsavel: 'Teste3',
          marcador: 'null',
          codigoTipoAtividade: 3,
          tipoAtividade: 'Pessoal',
          solicitante: 'CRIAR EDITAR',
          codigoStatus: 1,
          status: 'BACKLOG',
          codigoPrioridade: 2,
          prioridade: 'Média',
          dataPlanejamento: '08/03/2022',
          duracao: 7,
          codigoRevisor: 3,
          revisor: 'Teste3',
          codigoCriador: 1,
          criador: 'Teste'
      },
      ]
  };

  columns: TableColumn[];

  readonly headerHeight = 50;
  readonly footerHeight = 50;
  readonly rowHeight = 50;
  isLoading: boolean;

  columnMode = ColumnMode;
  expanded: any = {};

  constructor(private tableService: TableService, private el: ElementRef, private http: HttpService) {}

  async ngOnInit() {
    this.tableService.emitLoading.subscribe((value: boolean) => {
      console.log('emitLoading', value);
      this.isLoading = value;
    });

    this.tableService.emitPageBody.subscribe((value: TableInfoInterface) => {
      console.log('emitPageData', value);
      //this.page = value;
    });

    this.tableService.setPage(this.namePage, this.page);
  }

  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }

  setPage(pageInfo: TableInfoInterface){
    this.tableService.setPage(this.namePage, pageInfo);
  }

  // onScroll(offsetY: any) {
  //   const viewHeight = this.el.nativeElement.getBoundingClientRect().height - this.headerHeight;

  //   if (!this.isLoading && offsetY + viewHeight >= this.rows.length * this.rowHeight) {
  //     this.loadPage();
  //   };
  // };

  // async loadPage() {
  //   if(this.pageNumber <= (Math.ceil(this.total / this.pageSize)) || this.total === undefined){
  //     this.isLoading = true;
  //     await this.http.get(`atividades?page=${this.pageNumber}&pageSize=${this.pageSize}`).then((result: ResultInterface) => {
  //       if(result.data.total >= this.pageSize){
  //         this.style = `height: ${(this.pageSize * this.rowHeight) + this.headerHeight + this.footerHeight}px;`;
  //       };

  //       result.data.data.forEach((value: AtividadesInterface) => {
  //         this.rows.push(value);
  //       });

  //       this.total = result.data.total;
  //       this.isLoading = false;
  //       this.pageNumber++;
  //     });
  //   };
  // };

}
