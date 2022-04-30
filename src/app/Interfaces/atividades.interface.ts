/* eslint-disable @typescript-eslint/naming-convention */
import { TableColumn } from '@swimlane/ngx-datatable';

export interface ResultAtividadeInterface {
  message: string;
  success: boolean;
  data: AtividadeDataInterface;
  errors: any[];
};

export interface AtividadeDataInterface {
  total?: number;
  totalPages?: number;
  pageSize?: number;
  header?: TableColumn[];
  rows: AtividadesInterface[];
}
export interface AtividadesInterface {
  codigo: number;
  codigo_empresa: number;
  empresa: string;
  numero_documento: number;
  titulo: string;
  descricao: string;
  data_criacao: Date;
  codigo_destinacao: number;
  destinacao: string;
  codigo_responsavel: number;
  responsavel: string;
  marcador: string;
  codigo_tipo_atividade: number;
  tipo_atividade: string;
  solicitante: string;
  codigo_status: number;
  status: string;
  codigo_prioridade: number;
  prioridade: string;
  data_planejamento: Date;
  duracao: number;
  codigo_revisor: number;
  revisor: string;
  codigo_criador: number;
  criador: string;
};
