import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, LoadingController, ViewWillEnter } from '@ionic/angular';
import { TranslateProvider } from '../../../providers';
import { Geolocation } from '@ionic-native/geolocation/ngx';


import { MapasService } from '../../../services/mapas.service';

import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations';
import { CentroAPI } from 'src/app/interfaces/centros-interfaces';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-home-location-menu',
  templateUrl: './home-location-menu.page.html',
  styleUrls: ['./home-location-menu.page.scss'],
  animations: [
    trigger('staggerIn', [
      transition('* => *', [
        query(':enter', style({ opacity: 0, transform: `translate3d(0,10px,0)` }), { optional: true }),
        query(':enter', stagger('300ms', [animate('600ms', style({ opacity: 1, transform: `translate3d(0,0,0)` }))]), { optional: true })
      ])
    ])
  ]
})
export class HomeLocationMenuPage implements OnInit {


    setlocation: String;
    items: string[];
    showItems: Boolean = false;
    arrayCentros: CentroAPI[];
    latitud: number;
    longitud: number;
    idMenu = 0;

    constructor(
      public navCtrl: NavController,
      public menuCtrl: MenuController,
      public loadingCtrl: LoadingController,
      private geolocation: Geolocation,
      private translate: TranslateProvider,
      private mapasService: MapasService,
      private usuarioService: UsuarioService,
      private activeRoute: ActivatedRoute
    ) {
    }

    async ngOnInit() {
      await this.usuarioService.present('Cargando Centros...');
      await this.mapasService.getCentros().then(res => {

        this.arrayCentros = res.Centros;
        this.mapasService.guardarCentros(this.arrayCentros);

      }).catch( error => {

        console.log('Error al cargar centros: ', error);

      });
      console.log('CENTROS API:' , this.arrayCentros);
      this.usuarioService.dismiss();
    }

    ionViewWillEnter() {
    }



    initializeItems() {

      this.items = [];
      for (const centro of this.arrayCentros) {
        if (this.items === []) {

          this.items.push(centro.Provincia);

        } else {

          const busqueda = this.items.find(aux => aux === centro.Provincia);
          if (busqueda === undefined ) {

            this.items.push(centro.Provincia);

          }
        }

      }
    }

    getItems(ev: any) {
      // Reset items back to all of the items
      this.initializeItems();

      // set val to the value of the searchbar
      const val = ev.target.value;

      // if the value is an empty string don't filter the items
      if (val && val.trim() !== '') {
        this.showItems = true;
        this.items = this.items.filter((item) => {
          return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        });
      } else {
        this.showItems = false;
      }
    }

    editprofile() {
      this.navCtrl.navigateForward('edit-profile');
    }

    settings() {
      this.navCtrl.navigateForward('settings');
    }

    logout() {
      this.navCtrl.navigateRoot('login');
    }

    messages() {
      this.navCtrl.navigateForward('messages');
    }

    async goToHomeResults(provincia: string) {
      await this.usuarioService.present('Cargando centros de ' + provincia + '...');
      this.arrayCentros.filter(centro => centro.Provincia === provincia);
      console.log('Centros filtrados: ', this.arrayCentros.filter(centro => centro.Provincia === provincia));
      this.mapasService.guardarCentrosFiltrados(this.arrayCentros.filter(centro => centro.Provincia === provincia));
      await this.usuarioService.dismiss();
      this.navCtrl.navigateForward('home-results');


    }

    async goToCentrosMPE() {
      await this.usuarioService.present('Cargando centros cercanos...');
      await this.obtenerLocalizacion();
      await this.mapasService.getCentros(this.latitud, this.longitud).then( res => {
        this.mapasService.guardarCentrosFiltrados(res.Centros);
        this.usuarioService.dismiss();
        this.navCtrl.navigateForward('home-results');
      }).catch( error => {

        console.log('Error al cargar los centros: ', error);
        this.usuarioService.presentAlert('Error al cargar centros cercanos.', 'Pruebe de nuevo más tarde', '');

      });
    }

    async obtenerLocalizacion() {
      await this.geolocation.getCurrentPosition().then((resp) => {
        console.log('Coordenadas');
        console.log(resp.coords.latitude);
        console.log(resp.coords.longitude);
        this.latitud = parseFloat(resp.coords.latitude.toString());
        this.longitud = parseFloat(resp.coords.longitude.toString());
      }).catch(err => {

        console.log('No tiene GPS ', err);
      });
      console.log('Mapas - Coordenadas: ', this.latitud, ' ', this.longitud);

    }

  }
