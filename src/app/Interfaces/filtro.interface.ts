export interface FiltroInterface {
  id?: string;
  titulo?: string;
  codigoStatus?: number[];
  codigoResponsavel?: number[];
  codigoRevisor?: number[];
  codigoEmpresa?: number[];
  codigoTipoContato?: number[];
  solicitante?: string;
  codigoPrioridade?: number[];
  codigoTipoAtividade?: number[];
  dataPlanejamento?: string;
  codigoCriador?: number[];
  codigoTime?: number[];
};

export interface FiltroAvancadoInterface {
  id?: string;
  titulo?: string;
  codigoStatus?: number[];
  codigoResponsavel?: number[];
  codigoRevisor?: number[];
  codigoEmpresa?: number[];
  codigoTipoContato?: number[];
  solicitante?: string;
  codigoPrioridade?: number[];
  codigoTipoAtividade?: number[];
  dataPlanejamento?: string;
  codigoCriador?: number[];
  codigoTime?: number[];
};
