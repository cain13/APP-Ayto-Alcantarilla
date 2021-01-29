import { Injectable } from '@angular/core';
import { DatosAddUbicacion, RespuestaTareasAPI, RespuestaTiposIncidenciasAPI, Tarea, TipoIncidencia } from '../interfaces/interfacesTareas';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from './usuario.service';
import { RespuestaAPIBasica } from '../interfaces/usuario-interfaces';
import { RespuestaAPIServicios, Servicio } from '../interfaces/servicos-interfaces';

const url =  'https://intranet-ayto.com/api';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  tarea: Servicio;
  listaTareas: Servicio[];
  listaTipoIncidencias: TipoIncidencia[] = [];

  constructor(private http: HttpClient,
              private usuarioService: UsuarioService) { }

  async obtenerListaTareas(username: string, pass: string, fecha: string): Promise<RespuestaAPIServicios> {

    const datosTareas = {

      UserName: username,
      Password: pass,
      FechaInicio: fecha

    };
    return await this.http.post<RespuestaAPIServicios>(`${url}/Ayto/GetServicios`, datosTareas).toPromise();

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

  setListaTareas(listaTareas: Servicio[]) {
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
      if (this.listaTareas[i].Servicio.IdServicio === parseInt(id, 10)) {
        return this.listaTareas[i];
      }
    }
    return null;
  }

  findByName(searchKey: string) {
    console.log(searchKey);
    const key: string = searchKey.toUpperCase();
    return Promise.resolve(this.listaTareas.filter((tarea: Servicio) =>
        (tarea.Descripcion +  ' ' + tarea.Usuario.Nombre + ' ' + ' ' + tarea.Usuario.ApellidosCompletos + ' ' +  
        tarea.FechaInicio + ' ' + tarea.FechaFin + ' ' + tarea.Usuario.IdUsuario 
        + ' ' + tarea.Usuario.Edad  + ' ' + tarea.Usuario.Direccion + ' ' + tarea.Usuario.DNI
        + ' ' + tarea.Grado ).toUpperCase().indexOf(key) > -1));
  }


  guardarTarea(tarea: Servicio) {

    this.tarea = tarea;

  }

  getTarea(): Servicio {

    return this.tarea;

  }
}
