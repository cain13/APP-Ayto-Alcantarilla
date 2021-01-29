import { Injectable } from '@angular/core';
import { RespuestaAPINoticias } from '../interfaces/noticias-interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const url =  'https://intranet-ayto.com/api/Ayto/GetNoticias';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  header = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private http: HttpClient) { }

  async getNoticias(idUsuario: number): Promise <RespuestaAPINoticias> {
    
    const usuario = {

      IdUsuario: idUsuario

    };

    const respuesta = await  this.http.post<RespuestaAPINoticias>(url, usuario, {headers: this.header}).toPromise();

    return respuesta;

  }

}
