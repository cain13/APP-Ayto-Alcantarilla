import { Injectable } from '@angular/core';
import certificados from './mock-certificados';

@Injectable({
  providedIn: 'root'
})
export class CertificadosAptitudService {

  invoiceCounter = 0;
  documentos: Array<any> = certificados;

  constructor() { }

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
