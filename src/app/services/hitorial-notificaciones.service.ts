import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';
import documentos from '../providers/documentos/mock-documentos';
import { DatosFiltros } from '../interfaces/usuario-interfaces';

@Injectable({
  providedIn: 'root'
})
export class HitorialNotificacionesService {

  listaDocumentosTodos = [];
  listaDocumentos = [];
  Cantidad: number;
  datosFiltros: DatosFiltros;
  constructor( private usuarioService: UsuarioService ) { }

    setDocumento(listadocumentos: any[]) {
      this.listaDocumentosTodos = listadocumentos;
      this.listaDocumentos = listadocumentos;
    }

    findAll() {
      return Promise.resolve(this.listaDocumentosTodos);
    }

    getDocumentosFiltro() {
      return this.listaDocumentos;
    }

    getDocumentos() {
      return this.listaDocumentosTodos;
    }

    findById(id: number) {
      return Promise.resolve(this.listaDocumentosTodos[id - 1]);
    }

    getItem(id: string) {
      for (let i = 0; i < this.listaDocumentosTodos.length; i++) {
        if (this.listaDocumentosTodos[i].id === parseInt(id, 10)) {
          return this.listaDocumentosTodos[i];
        }
      }
      return null;
    }

    findByName(searchKey: string) {
      console.log(searchKey);
      const key: string = searchKey.toUpperCase();
      return Promise.resolve(this.listaDocumentosTodos.filter((documento: any) =>
          (documento.Referencia +  ' ' + documento.FechaNotificacion + ' ' + documento.TipoDocumento).toUpperCase().indexOf(key) > -1));
    }

    guardarFiltros(filtros: DatosFiltros) {

      this.datosFiltros = filtros;

    }

    getFiltros(): DatosFiltros {

      return this.datosFiltros;

    }

    getDocumentosSinLeer() {
      return this.Cantidad;
    }


    // tslint:disable-next-line: no-shadowed-variable
    setCantidadDocumentosSinLeer(documentos: number) {
      this.Cantidad = documentos;
    }
}
