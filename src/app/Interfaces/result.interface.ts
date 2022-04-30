import { TableColumn } from '@swimlane/ngx-datatable';
export interface ResultInterface {
  message: string;
  success: boolean;
  data: ResultDataInterface;
  errors: any[];
};

export interface ResultDataInterface {
  total?: number;
  totalPages?: number;
  pageSize?: number;
  header?: TableColumn[];
  rows: any[];
}
