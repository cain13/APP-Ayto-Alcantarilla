import { Injectable } from '@angular/core';
import { DatosAddUbicacion, RespuestaTareasAPI, RespuestaTiposIncidenciasAPI, Tarea, TipoIncidencia } from '../interfaces/interfacesTareas';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from './usuario.service';
import { RespuestaAPIBasica } from '../interfaces/usuario-interfaces';

const url =  'https://abm-time.com/api';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  tarea: Tarea;
  listaTareas: Tarea[];
  listaTipoIncidencias: TipoIncidencia[] = [
      {
      IdIncidencia: 0,
      Nombre: 'Usuario Ausente'
    },
    {
      IdIncidencia: 1,
      Nombre: 'Otros'
    }
  ];

  constructor(private http: HttpClient,
              private usuarioService: UsuarioService) { }

  async obtenerListaTareas(idUsuario: number, fecha: string): Promise<RespuestaTareasAPI> {

    const datosTareas = {

      IdUsuario: idUsuario,
      Fecha: fecha

    };
    return await this.http.post<RespuestaTareasAPI>(`${url}/TareaApi/GetApiListaTareas`, datosTareas).toPromise();

  }

  async obtenerListaTiposIncidencia(idUsuario: number): Promise<RespuestaTiposIncidenciasAPI> {

    const datosUsuario = {

      IdUsuario: idUsuario

    };
    return await this.http.post<RespuestaTiposIncidenciasAPI>(`${url}/TareaApi/GetApiListaTareas`, datosUsuario).toPromise();

  }

  async addUbicacionAPI(latitud: number, longitud: number, pin: string, idUsuario: number): Promise<RespuestaAPIBasica> {

    const datosAddUbicacion: DatosAddUbicacion = {

      IdUsuario: idUsuario,
      Latitud: latitud,
      Longitud: longitud,
      Pin: pin
    };
    return await this.http.post<RespuestaAPIBasica>(`${url}/TareaApi/GetApiListaTareas`, datosAddUbicacion).toPromise();

  }

  guardarListaIncidencias( listaIncidencias: TipoIncidencia[]) {

    this.listaTipoIncidencias = listaIncidencias;

  }

  getListaIncidencias(): TipoIncidencia[] {

    return this.listaTipoIncidencias;

  }

  setListaTareas(listaTareas) {
    this.listaTareas = listaTareas;
  }

  findAll() {
    return Promise.resolve(this.listaTareas);
  }

  getListaTareas() {
    return this.listaTareas;
  }

  findById(id) {
    return Promise.resolve(this.listaTareas[id - 1]);
  }

  getItem(id) {
    for (let i = 0; i < this.listaTareas.length; i++) {
      if (this.listaTareas[i].IdTarea === parseInt(id, 10)) {
        return this.listaTareas[i];
      }
    }
    return null;
  }

  findByName(searchKey: string) {
    console.log(searchKey);
    const key: string = searchKey.toUpperCase();
    return Promise.resolve(this.listaTareas.filter((tarea: Tarea) =>
        (tarea.Descripcion +  ' ' + tarea.Nombre + ' ' + 
        tarea.HoraInicio + ' ' + tarea.HoraFin + ' ' + tarea.IdPersonaAsistida 
        + ' ' + tarea.IdPersonaAsistida + ' ' + tarea.Edad + ' ' + tarea.DireccionTarea + ' ' + tarea.TelefonoCliente
        + ' ' + tarea.Grado + ' ' + tarea.IdEstado).toUpperCase().indexOf(key) > -1));
  }


  guardarTarea(tarea: Tarea) {

    this.tarea = tarea;

  }

  getTarea(): Tarea {

    return this.tarea;

  }
}
