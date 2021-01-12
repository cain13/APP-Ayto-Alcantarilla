import { Injectable } from '@angular/core';
import { RespuestaTareasAPI, Tarea } from '../interfaces/interfacesTareas';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from './usuario.service';

const url =  'https://abm-time.com/api';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  tarea: Tarea;
  listaTareas: Tarea[]

  constructor(private http: HttpClient,
              private usuarioService: UsuarioService) { }

  async obtenerTareas(): Promise<RespuestaTareasAPI> {

    const usuario = {

      idEmpleado: this.usuarioService.getUsuario().UserName

    };
    return await this.http.post<RespuestaTareasAPI>(`${url}/TareaApi/GetApiListaTareas`, usuario).toPromise();

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
