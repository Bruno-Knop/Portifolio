import { EventEmitter, Injectable } from '@angular/core';

import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class FiltrosService {
  // emitComboStatus = new EventEmitter<ComboInterface[]>();
  // emitComboResponsavel = new EventEmitter<ComboUsuarioInterface[]>();
  // emitComboRevisor = new EventEmitter<ComboUsuarioInterface[]>();
  // emitComboEmpresa = new EventEmitter<ComboEmpresaInterface[]>();
  // emitComboCriador = new EventEmitter<ComboUsuarioInterface[]>();

  constructor(private service: StorageService) { }

  // async comboStatus(){
  //   await this.storageService.getComboStatus().then(result => {
  //     this.emitComboStatus.emit(result);
  //   });
  // }

  // async comboResponsavel(){
  //   await this.storageService.getComboResponsavel().then(result => {
  //     this.emitComboResponsavel.emit(result);
  //   });
  // }

  // async comboRevisor(){
  //   await this.storageService.getComboRevisor().then(result => {
  //     this.emitComboRevisor.emit(result);
  //   });
  // }

  // async comboEmpresa(){
  //   await this.storageService.getComboEmpresa().then(result => {
  //     this.emitComboEmpresa.emit(result);
  //   });
  // }

  // async comboCriador(){
  //   await this.storageService.getComboCriador().then(result => {
  //     this.emitComboCriador.emit(result);
  //   });
  // }

}
