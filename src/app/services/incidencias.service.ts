import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaAPIBasica } from '../interfaces/usuario-interfaces';
import { Incidencia } from '../interfaces/incidencia-interfaces';

const url =  'https://intranet-ayto.com/api/Ayto/Incidencia';

@Injectable({
  providedIn: 'root'
})
export class IncidenciasService {

  header = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private http: HttpClient) { }
  
  async enviarIncidencia(userName: string,pass: string, idTipoIncidencia: number, fechaHoy: string, descripcion: string, idTarea: number) {

    const incidencia: Incidencia = {
      UserName: userName,
      Password: pass,
      Descripcion: descripcion,
      FechaIncidencia: fechaHoy,
      IdEventoServicio: idTarea,
      IdIncidencia: idTipoIncidencia
    };

    return await this.http.post<RespuestaAPIBasica>(url, incidencia, {headers: this.header}).timeout(7000).toPromise();
  }

  async enviarIncidenciaPendientesAPI(userName: string,pass: string, idTipoIncidencia: number, fechaHoy: string, descripcion: string, idTarea: number){
    
    const incidencia: Incidencia = {
      UserName: userName,
      Password: pass,
      Descripcion: descripcion,
      FechaIncidencia: fechaHoy,
      IdEventoServicio: idTarea,
      IdIncidencia: idTipoIncidencia
    };

    console.log('Incidencia Pendiente: ', incidencia);
    
    return await this.http.post<RespuestaAPIBasica>(url, incidencia, {headers: this.header}).timeout(7000).toPromise();


  }


}
