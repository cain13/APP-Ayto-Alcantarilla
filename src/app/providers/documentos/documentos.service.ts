import { Injectable } from '@angular/core';
import documentos from './mock-documentos';

@Injectable({
  providedIn: 'root'
})
export class DocumentosService {

  invoiceCounter: number = 0;
  documentos: Array<any> = documentos;

  findAll() {
    return this.documentos;
  }

  findById(id) {
    return Promise.resolve(this.documentos[id - 1]);
  }

  getItem(id) {
    for (let i = 0; i < this.documentos.length; i++) {
      if (this.documentos[i].id === parseInt(id, 10)) {
        return this.documentos[i];
      }
    }
    return null;
  }

  getInvoices() {
    return Promise.resolve(this.documentos);
  }
}