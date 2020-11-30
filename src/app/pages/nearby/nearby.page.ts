import { Component, OnInit } from '@angular/core';
import { NavController, ViewWillEnter } from '@ionic/angular';

import { PropertyService, TranslateProvider } from '../../providers';

import { environment } from '../../../environments/environment';
import { MapasService } from '../../services/mapas.service';
import { CentroAPI } from '../../interfaces/centros-interfaces';

@Component({
  selector: 'app-nearby',
  templateUrl: './nearby.page.html',
  styleUrls: ['./nearby.page.scss'],
})
export class NearbyPage implements ViewWillEnter{
  agmStyles = environment.agmStyles;
  nearProperties: Array<any>;
  arrayCentros: CentroAPI[];
  arrayCentrosFloat: CentroAPI[];
  constructor(
    public navCtrl: NavController,
    public service: PropertyService,
    private translate: TranslateProvider,
    private mapasService: MapasService
  ) {
   
  }



  ionViewWillEnter() {
    this.findAll();
  }

  findAll() {
    this.arrayCentros = this.mapasService.getCentrosGuardados();
    this.arrayCentros.sort(function(a, b){
      if(a.Localidad < b.Localidad) { return -1; }
      if(a.Localidad > b.Localidad) { return 1; }
      return 0;
  })
    console.log("arrayCentros", this.arrayCentros);
    // if(this.arrayCentros.length > 0){
    //   this.arrayCentros.forEach(element => {
    //     let centro: CentroAPI;
    //     console.log("element ",element);
    //     console.log("CodigoPsotal ",element.CodigoPostal);
    //     if( element.CodigoPostal !== undefined && element.CodigoPostal.length > 0){
    //       centro.CodigoPostal = element.CodigoPostal;
    //     }
    //     if( element.Localidad !== undefined && element.Localidad.length > 0){
    //       centro.Localidad = element.Localidad;
    //     }
    //     if( element.IdCentroFav !== undefined){
    //       centro.IdCentroFav = element.IdCentroFav;
    //     }
    //     if( element.Distancia !== undefined && element.Distancia.length > 0){
    //       centro.Distancia = element.Distancia;
    //     }
    //     if( element.Email !== undefined && element.Email.length > 0){
    //       centro.Email = element.Email;
    //     }
    //     if( element.Horario !== undefined && element.Horario.length > 0){
    //       centro.Horario = element.Horario;
    //     }
    //     if( element.Id !== undefined){
    //       centro.Id = element.Id;
    //     }
    //     if( element.Imagen !== undefined && element.Imagen.length > 0){
    //       centro.Imagen = element.Imagen;
    //     }
    //     if( element.Nombre !== undefined && element.Nombre.length > 0){
    //       centro.Nombre = element.Nombre;
    //     }
    //     if( element.Provincia !== undefined && element.Provincia.length > 0){
    //       centro.Provincia = element.Provincia;
    //     }
    //     if( element.Telefono !== undefined && element.Telefono.length > 0){
    //       centro.Telefono = element.Telefono;
    //     }
    //     if( element.DireccionCompleto !== undefined && element.DireccionCompleto.length > 0){
    //       centro.DireccionCompleto = element.DireccionCompleto;
    //     }
    //     if( element.Latitud !== undefined){
    //       centro.Latitud = parseFloat(element.Latitud.toString());
    //     }
    //     if( element.Longitud !== undefined){
    //       centro.Longitud = parseFloat(element.Longitud.toString());
    //     }
    //     this.arrayCentrosFloat.push(centro);
    //   });
    //}
  }

}
