import { TableColumn } from '@swimlane/ngx-datatable';
export interface TableInfoInterface {
  offset: number;
  limit: number;
  count: number;
  totalPages: number;
  header: TableColumn[];
  rows: any[];
}

