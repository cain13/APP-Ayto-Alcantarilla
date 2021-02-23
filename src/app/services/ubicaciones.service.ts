import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListaUsuariosApi, UsuarioLoginAPP, UsuarioUbicaciones, UsuarioAPI } from '../interfaces/usuario-interfaces';

const url =  'https://intranet-ayto.com/api';

@Injectable({
  providedIn: 'root'
})
export class UbicacionesService {

  header = new HttpHeaders().set('Content-Type', 'application/json');
  arrayUsuariosAPI: UsuarioAPI[];


  constructor(private http: HttpClient) { }

  async getUsuariosAPI(userName: string, password: string): Promise<ListaUsuariosApi> {

    const usuario: UsuarioUbicaciones = {
      UserName: userName,
      Password: password,
    };

    return await this.http.post<ListaUsuariosApi>(`${url}/Ayto/GetUsuarios`, usuario, {headers: this.header}).timeout(20000).toPromise();

  }

  guardarArrayUsuarios(array: UsuarioAPI[]) {

    this.arrayUsuariosAPI = array;

  }

  getArrayUsuarios(): UsuarioAPI[] {

    return this.arrayUsuariosAPI;

  }


  getItem(id) {
    for (let i = 0; i < this.arrayUsuariosAPI.length; i++) {
      if (this.arrayUsuariosAPI[i].IdUsuario === parseInt(id, 10)) {
        return this.arrayUsuariosAPI[i];
      }
    }
    return null;
  }

  findByName(searchKey: string) {
    console.log(searchKey);
    const key: string = searchKey.toUpperCase();
    return Promise.resolve(this.arrayUsuariosAPI.filter((usuario: UsuarioAPI) =>
        (usuario.NombreCompleto ).toUpperCase().indexOf(key) > -1));
  }

  findAll() {
    return Promise.resolve(this.arrayUsuariosAPI);
  }

}
