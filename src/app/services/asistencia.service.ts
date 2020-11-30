import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { DatosFiltros } from '../interfaces/usuario-interfaces';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {
  listaAsistenciasTodos = [];
  filtrosAsistencias: DatosFiltros;

  constructor() { }

    setAsistencia(listadocumentos){
      this.listaAsistenciasTodos = listadocumentos;
    }

    findAll() {
      return Promise.resolve(this.listaAsistenciasTodos);
    }

    getAsistencias() {
      return this.listaAsistenciasTodos;
    }

    findById(id) {
      return Promise.resolve(this.listaAsistenciasTodos[id - 1]);
    }

    getItem(id) {
      for (let i = 0; i < this.listaAsistenciasTodos.length; i++) {
        if (this.listaAsistenciasTodos[i].id === parseInt(id)) {
          return this.listaAsistenciasTodos[i];
        }
      }
      return null;
    }

    guardarFiltrosAsistencias(filtros: DatosFiltros) {

      this.filtrosAsistencias = filtros;
      console.log('Filtros Service: ' , this.filtrosAsistencias);
    }

    getFiltrosAsistencias(): DatosFiltros {

      return this.filtrosAsistencias;
    }
    findByName(searchKey: string) {
      console.log(searchKey);
      const key: string = searchKey.toUpperCase();
      return Promise.resolve(this.listaAsistenciasTodos.filter((documento: any) => 
          (documento.Trabajador +  ' ' + documento.NifTrabajador + ' ' + documento.FechaDocumento + ' ' + documento.NombreCentroMedico + ' ' + documento.SituacionReconocimientoMedico).toUpperCase().indexOf(key) > -1));
    }
}
