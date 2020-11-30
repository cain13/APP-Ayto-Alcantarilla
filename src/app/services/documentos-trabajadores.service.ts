import { Injectable } from '@angular/core';
import { RespuestaAPIGetDocumentos, ObtenerDocumentosTrabajadores, RecuentoNotificacionesResponse } from '../interfaces/interfaces-grupo-mpe';
import { Platform } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { DatosFiltros } from '../interfaces/usuario-interfaces';



@Injectable({
  providedIn: 'root'
})
export class DocumentosTrabajadoresService {
  listaDocumentosTodos = [];
  Cantidad: number;
  filtros: DatosFiltros;
  constructor( private usuarioService: UsuarioService ) { }

    setDocumento(listadocumentos) {
      this.listaDocumentosTodos = listadocumentos;
    }

    findAll() {
      return Promise.resolve(this.listaDocumentosTodos);
    }

    getDocumentos() {
      return this.listaDocumentosTodos;
    }

    findById(id) {
      return Promise.resolve(this.listaDocumentosTodos[id - 1]);
    }

    getItem(id) {
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
          (documento.Descripcion +  ' ' + documento.FechaDocumento).toUpperCase().indexOf(key) > -1));
    }

    getDocumentosSinLeer() {
      return this.Cantidad;
    }

    setCantidadDocumentosSinLeer(documentos) {
      this.Cantidad = documentos;
    }

    guardarFiltros(filtros: DatosFiltros) {

      this.filtros = filtros;

    }

    getFiltros(): DatosFiltros {

      return this.filtros;

    }
}
