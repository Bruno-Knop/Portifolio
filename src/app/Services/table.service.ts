import { EventEmitter, Injectable } from '@angular/core';
import { ResultInterface } from 'src/app/Interfaces/result.interface';

import { TableInfoInterface } from './../Interfaces/tabela.interface';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  emitLoading = new EventEmitter<boolean>();
  emitPageData = new EventEmitter<TableInfoInterface>();

  constructor(private http: HttpService) {}

  async setPage(endpoint: string, tableInfo: TableInfoInterface) {
    this.emitLoading.emit(true);
    await this.http.get(`${endpoint}?page=${tableInfo.offset}&pageSize=${tableInfo.limit}`).then((result: ResultInterface) => {

      tableInfo.count = result.data.total;
      tableInfo.totalPages = result.data.totalPages;
      tableInfo.header = result.data.header;
      tableInfo.rows = result.data.rows;

      this.emitPageData.emit(tableInfo);
      this.emitLoading.emit(false);
    });
  };
}
