import { TableColumn } from '@swimlane/ngx-datatable';

export interface ResultComboInterface {
  message: string;
  success: boolean;
  data: ComboDataInterface;
  errors: any[];
};

export interface ComboDataInterface {
    total?: number;
    totalPages?: number;
    pageSize?: number;
    header?: TableColumn[];
    rows: ComboInterface[];
}
export interface ComboInterface {
  codigo: number;
  descricao: string;
};
