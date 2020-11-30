import { Injectable } from '@angular/core';
import { Certificado, Asistencia } from '../interfaces/interfaces-grupo-mpe';
import { DatosFiltros } from '../interfaces/usuario-interfaces';

@Injectable({
  providedIn: 'root'
})
export class CitasPendientesService {

  listaCitas = [];
  citasInfo: Asistencia;
  filtrosCitas: DatosFiltros;

  constructor() {  }

  setCitaPendiente(listaCitas) {
    this.listaCitas = listaCitas;
  }

  findAll() {
    return Promise.resolve(this.listaCitas);
  }

  getCertificados() {
    return this.listaCitas;
  }

  findById(id) {
    return Promise.resolve(this.listaCitas[id - 1]);
  }

  getItem(id) {
    for (let i = 0; i < this.listaCitas.length; i++) {
      if (this.listaCitas[i].id === parseInt(id, 10)) {
        return this.listaCitas[i];
      }
    }
    return null;
  }

  findByName(searchKey: string) {
    console.log(searchKey);
    const key: string = searchKey.toUpperCase();
    return Promise.resolve(this.listaCitas.filter((certificado: any) =>
        (certificado.Descripcion +  ' ' + certificado.FechaCita).toUpperCase().indexOf(key) > -1));
  }

  guardarCitaPendiente(cert: Asistencia){

    this.citasInfo = cert;

  }

  getCertificadoInfo(): Asistencia {

    return this.citasInfo

  }

  guardarFiltrosCitas( filtros: DatosFiltros) {

    this.filtrosCitas = filtros;
    console.log('Filtros Service: ' , this.filtrosCitas);
  }

  getFiltrosCitas(): DatosFiltros {

    return this.filtrosCitas
  }
}
