import { Injectable } from '@angular/core';
import { Certificado } from '../interfaces/interfaces-grupo-mpe';

@Injectable({
  providedIn: 'root'
})
export class CertificadosService {

  listaCertificados = [];
  certificadoInfo: Certificado;

  constructor() {  }

  setCertificado(listaCertificados) {
    this.listaCertificados = listaCertificados;
  }

  findAll() {
    return Promise.resolve(this.listaCertificados);
  }

  getCertificados() {
    return this.listaCertificados;
  }

  findById(id) {
    return Promise.resolve(this.listaCertificados[id - 1]);
  }

  getItem(id) {
    for (let i = 0; i < this.listaCertificados.length; i++) {
      if (this.listaCertificados[i].id === parseInt(id, 10)) {
        return this.listaCertificados[i];
      }
    }
    return null;
  }

  findByName(searchKey: string) {
    console.log(searchKey);
    const key: string = searchKey.toUpperCase();
    return Promise.resolve(this.listaCertificados.filter((certificado: any) =>
        (certificado.Descripcion +  ' ' + certificado.FechaDocumento + ' ' + certificado.CentroTrabajo + ' ' + certificado.DomicilioCentroTrabajo + ' ' + certificado.TipoCentroTrabajo).toUpperCase().indexOf(key) > -1));
  }

  guardarCertificadoInfo(cert: Certificado){

    this.certificadoInfo = cert;

  }

  getCertificadoInfo(): Certificado {

    return this.certificadoInfo

  }

}
