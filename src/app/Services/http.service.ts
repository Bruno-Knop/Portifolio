import { ResultInterface } from './../Interfaces/result.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const API = environment.api;
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  async get(req: string, options?: any){
    return await this.http.get(`${API}/${req}`, options)
      .toPromise()
      .then((retorno: any) => retorno);
  };

  async post(req: string, value: any){
    return await this.http.post(`${API}/${req}`, value)
      .toPromise()
      .then((retorno: any) => retorno);
  };

  async put(req: string, value: any) {
    return await this.http.put(`${API}/${req}/${value.codigo}`, value)
      .toPromise()
      .then((retorno: any) => retorno);
  };

  async delete(req: string, codigo: number) {
    return await this.http.delete(`${API}/${req}/${codigo}`)
      .toPromise()
      .then((retorno: any) => retorno);
  };

  //UPLOADS
  async upload(req: string, value: any){
    return await this.http.post(`${API}/${req}`, value)
      .toPromise()
      .then((retorno: any) => retorno);
  };

  //CEP
  async cep(req: string) {
    return await this.http.get<any>(`https://ws.apicep.com/cep/${req}.json`)
      .toPromise()
      .then(res => res);
  };
}
