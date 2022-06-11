import { MenuInterface } from './menu.interface';
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
  token: string;
  imgPerfil: string;
  menu: MenuInterface[];
}
