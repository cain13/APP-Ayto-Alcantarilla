import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CentroAPI, RespuestaAPICentros } from '../interfaces/centros-interfaces';
import { Centro } from '../interfaces/interfaces-grupo-mpe';
import { CentrosMPEFiltros } from '../interfaces/usuario-interfaces';

@Injectable({
  providedIn: 'root'
})
export class MapasService {

  centrosAPI: CentroAPI[];
  centrosAPIFiltrados: CentroAPI[];
  centroSelec: CentroAPI;
  centroFiltro: CentrosMPEFiltros;

  constructor(private http: HttpClient) { }

  async getCentros(latitud?: number, longitud?: number) {

    const coordenadas = {

      Latitud: latitud,
      Longitud: longitud
    };
    console.log('MapasService, Coordenadas: ', coordenadas);

    const respuesta = await this.http.post<RespuestaAPICentros>('https://mpecronos.com/api/apiMpe/GetCentrosMpe', coordenadas).toPromise();
    return respuesta;
  }

  guardarCentros(centros: CentroAPI[]) {

    this.centrosAPI = centros;

  }

  getCentrosGuardados(): CentroAPI[] {

    return this.centrosAPI;

  }

  guardarCentrosFiltrados(centros: CentroAPI[]) {
    this.centrosAPIFiltrados = centros;
  }

  getCentrosFiltrados(): CentroAPI[] {
    return this.centrosAPIFiltrados;
  }

  guardarFiltroCentros(filtro: CentrosMPEFiltros) {
    this.centroFiltro = filtro;
  }

  getFiltroCentro(filtro: CentrosMPEFiltros) {
    return this.centroFiltro;
  }

  guardarCentroSeleccionado(centro: CentroAPI) {

    this.centroSelec = centro;

  }

  getCentroSelec(): CentroAPI {

    return this.centroSelec;

  }

  findByName(searchKey: string) {
    console.log(searchKey);
    const key: string = searchKey.toUpperCase();
    return Promise.resolve(this.centrosAPI.filter((centro: any) =>
        (centro.Direccion +  ' ' + centro.CodigoPostal + ' ' + centro.Provincia + ' ' + centro.Localidad).toUpperCase().indexOf(key) > -1));
  }

}
