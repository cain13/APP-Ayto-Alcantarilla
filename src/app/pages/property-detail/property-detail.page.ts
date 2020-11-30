import { Component, OnInit } from '@angular/core';
import { NavController, ActionSheetController, ModalController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

import { ImagePage } from '../modal/image/image.page';
import { MapasService } from '../../services/mapas.service';
import { CentroAPI } from '../../interfaces/centros-interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioLogin, UsuarioLoginApi } from '../../interfaces/usuario-interfaces';
import { DatabaseService } from '../../services/database.service';

import {
  PropertyService,
  // BrokerService,
} from '../../providers';


import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.page.html',
  styleUrls: ['./property-detail.page.scss'],
  animations: [
    trigger('staggerIn', [
      transition('* => *', [
        query(':enter', style({ opacity: 0, transform: `translate3d(0,10px,0)` }), { optional: true }),
        query(':enter', stagger('300ms', [animate('600ms', style({ opacity: 1, transform: `translate3d(0,0,0)` }))]), { optional: true })
      ])
    ])
  ]
})
export class PropertyDetailPage implements OnInit {

  propertyID: any;
  property: any;
  propertyopts: String = 'location';
  centro: CentroAPI;
  usuario: UsuarioLoginApi;
  isCentroFav: boolean;

  constructor (
    public asCtrl: ActionSheetController,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public route: ActivatedRoute,
    public router: Router,
    private propertyService: PropertyService,
    private mapasService: MapasService,
    private usuarioService: UsuarioService,
    private databaseService: DatabaseService
  ) {
    this.centro = this.mapasService.getCentroSelec();
    this.usuario = this.usuarioService.getUsuario();

    console.log(this.usuario);
  }

  async ngOnInit() {
    await this.usuarioService.present('Cargando centro...');
    if (this.usuario !== undefined) {
      await this.databaseService.obtenerCentroFav(this.centro.Id).then( res => {

        if (res) {

          this.isCentroFav = true;

        } else {

          this.isCentroFav = false;

        }

      }).catch( error => {

        this.isCentroFav = false;

      });


    }

    this.usuarioService.dismiss();

  }
  ionViewWillEnter() {
  }

  async presentImage(image: any) {
    const modal = await this.modalCtrl.create({
      component: ImagePage,
      componentProps: { value: image }
    });
    return await modal.present();
  }


  /* favorite(property) {
    this.propertyService.favorite(property)
        .then(async res => {
            const toast = await this.toastCtrl.create({
                message: 'Property added to your favorites',
                duration: 2000,
                position: 'bottom',
                buttons: [
                  {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                      console.log('Cancel clicked');
                    }
                  }
                ]
            });

            toast.present();
        });
  } */

  async favorite(centro: CentroAPI) {

    /* await this.usuarioService.addCentroFav(centro).then( async () => {

      const toast = await this.toastCtrl.create({
        message: 'Centro añadido a favoritos.',
        duration: 2000,
        position: 'bottom',
      });
      this.isCentroFav = true;
      toast.present();

    }).catch( async error => {
      console.log('ERROR: ', error);
      const toast = await this.toastCtrl.create({
        message: 'Error al añadir a favoritos.',
        duration: 2000,
        position: 'bottom',
      });
      toast.present();
    }); */

  }

  async borrarFavorite(centro: CentroAPI) {

    /* await this.usuarioService.borrarCentroFav(centro.Id).then( async () => {

      const toast = await this.toastCtrl.create({
        message: 'Centro borrado de favoritos.',
        duration: 2000,
        position: 'bottom',
      });
      this.isCentroFav = false;
      toast.present();

    }).catch( async error => {
      console.log('ERROR: ', error);
      const toast = await this.toastCtrl.create({
        message: 'Error al borrar de favoritos.',
        duration: 2000,
        position: 'bottom',
      });
      toast.present();
    }); */

  }

  async share() {
    const actionSheet = await this.asCtrl.create({
      header: 'Share Property on:',
      buttons: [{
        text: 'Facebook',
        role: 'facebook',
        icon: 'logo-facebook',
        handler: () => {
          console.log('Facebook clicked');
        }
      }, {
        text: 'Twitter',
        icon: 'logo-twitter',
        handler: () => {
          console.log('Twitter clicked');
        }
      }, {
        text: 'Google+',
        icon: 'logo-googleplus',
        handler: () => {
          console.log('Google+ clicked');
        }
      }, {
        text: 'Instagram',
        icon: 'logo-instagram',
        handler: () => {
          console.log('Instagram clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  range(n: Array<any>) {
    return new Array(n);
  }

  avgRating() {
    let average = 0;

    this.property.reviews.forEach((val: any, key: any) => {
      average += val.rating;
    });

    return average / this.property.reviews.length;
  }

  // async openCart() {
  //   const modal = await this.modalCtrl.create({
  //     component: CartPage
  //   });
  //   return await modal.present();
  // }

}
