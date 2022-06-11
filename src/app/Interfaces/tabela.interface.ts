import { TableColumn } from '@swimlane/ngx-datatable';

import { FiltroAvancadoInterface, FiltroInterface } from './filtro.interface';

export interface TableInfoInterface {
  typeTable: 'api' | 'local';
  offset: number;
  limit: number;
  count: number;
  totalPages: number;
  header: TableColumn[];
  rows: any[];
  filtros?: FiltroInterface;
  filtrosAvancado?: FiltroAvancadoInterface;
}
