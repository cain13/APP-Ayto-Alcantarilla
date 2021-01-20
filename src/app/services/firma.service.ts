import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { FirmaAPI, FirmaPendiente } from '../interfaces/firma-interfaces';
import { RespuestaAPIBasica } from '../interfaces/usuario-interfaces';
import { File } from '@ionic-native/file/ngx';

const url =  'https://abm-time.com/api';


@Injectable({
  providedIn: 'root'
})
export class FirmaService {
  
  header = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient,
              private file: File) { }


  async enviarFirmaAPI(idUsuario: number, idTarea: number, firmaBase64: string) {

    const firma: FirmaAPI = {
      IdUsuario: idUsuario,
      IdTarea: idTarea,
      FirmaBase64: firmaBase64
    };

    return await this.http.post<RespuestaAPIBasica>(`${url}/LoginApp/Login`, firma, {headers: this.header}).timeout(7000).toPromise();
  }

  async enviarFirmasPendientesAPI(firmaPendiente: FirmaPendiente){
    var base64data: string | ArrayBuffer;                
    var reader = new FileReader();
    reader.readAsDataURL(firmaPendiente.FirmaBase64); 
    reader.onloadend = function() {
      base64data = reader.result;                
      console.log('BLOB to base64: ',base64data);
    }
    const firma: FirmaAPI = {
      IdUsuario: firmaPendiente.IdUsuario,
      IdTarea: firmaPendiente.IdTarea,
      FirmaBase64: base64data.toString()
    };

    console.log('Firma Pendiente: ', firmaPendiente);
    
    return await this.http.post<RespuestaAPIBasica>(`${url}/LoginApp/Login`, firma, {headers: this.header}).timeout(7000).toPromise();


  }
}
