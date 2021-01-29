import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { FirmaAPI } from '../interfaces/firma-interfaces';
import { RespuestaAPIBasica } from '../interfaces/usuario-interfaces';
import { File } from '@ionic-native/file/ngx';

const url =  'https://intranet-ayto.com/api/Ayto/FinServicio';


@Injectable({
  providedIn: 'root'
})
export class FirmaService {
  
  header = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient,
              private file: File) { }


  async enviarFirmaAPI(username: string,pass: string, idEventoServicio: number, firmaBase64: string) {

    const firma: FirmaAPI = {
      UserName: username,
      Password: pass,
      IdEventoServicio: idEventoServicio,
      FirmaBase64: firmaBase64
    };

    return await this.http.post<RespuestaAPIBasica>(url, firma, {headers: this.header}).timeout(7000).toPromise();
  }

  async enviarFirmasPendientesAPI(firmaAPI: FirmaAPI){
    /*var base64data: string | ArrayBuffer;                
    var reader = new FileReader();
     reader.readAsDataURL(firmaAPI.FirmaBase64); 
    reader.onloadend = function() {
      base64data = reader.result;                
      console.log('BLOB to base64: ',base64data);
    } */
    const firma: FirmaAPI = {
      UserName: firmaAPI.UserName,
      Password: firmaAPI.Password,
      IdEventoServicio: firmaAPI.IdEventoServicio,
      FirmaBase64: firmaAPI.FirmaBase64
    };

    console.log('Firma Pendiente: ', firma);
    
    return await this.http.post<RespuestaAPIBasica>(url, firma, {headers: this.header}).timeout(7000).toPromise();


  }
}
