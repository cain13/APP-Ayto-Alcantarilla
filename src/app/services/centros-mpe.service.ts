import { Injectable } from '@angular/core';
import { CentroMPE } from '../interfaces/interfaces-grupo-mpe';

@Injectable({
  providedIn: 'root'
})
export class CentrosMpeService {
  listaCentrosMpe = [];
  centrosInfo: CentroMPE;
  

  constructor() {  }

  setCentroMpe(listaCentrosMpe) {
    this.listaCentrosMpe = listaCentrosMpe;
  }

  findAll() {
    return Promise.resolve(this.listaCentrosMpe);
  }

  getCentros() {
    return this.listaCentrosMpe;
  }

  findById(id) {
    return Promise.resolve(this.listaCentrosMpe[id - 1]);
  }

  getItem(id) {
    for (let i = 0; i < this.listaCentrosMpe.length; i++) {
      if (this.listaCentrosMpe[i].id === parseInt(id, 10)) {
        return this.listaCentrosMpe[i];
      }
    }
    return null;
  }

  findByName(searchKey: string) {
    console.log(searchKey);
    const key: string = searchKey.toUpperCase();
    return Promise.resolve(this.listaCentrosMpe.filter((certificado: any) =>
        (certificado.Descripcion +  ' ' + certificado.FechaCita).toUpperCase().indexOf(key) > -1));
  }

  guardarCentro(cent: CentroMPE){

    this.centrosInfo = cent;

  }

  getCentroInfo(): CentroMPE {

    return this.centrosInfo

  }

}
