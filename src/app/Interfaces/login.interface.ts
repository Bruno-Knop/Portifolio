export interface ResultLoginInterface {
  message: string;
  success: boolean;
  data: LoginInterface;
  errors: any[];
};

export interface LoginInterface {
  codigo: number;
  nome: string;
  perfil: string;
  time: string;
  token: string;
}
