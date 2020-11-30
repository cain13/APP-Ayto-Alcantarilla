import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, IonItemSliding } from '@ionic/angular';
import { DatabaseService } from '../../services/database.service';
import { CentroAPI } from '../../interfaces/centros-interfaces';
import { UsuarioService } from '../../services/usuario.service';

import {
  PropertyService,
  TranslateProvider
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
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  animations: [
    trigger('staggerIn', [
      transition('* => *', [
        query(':enter', style({ opacity: 0, transform: `translate3d(0,10px,0)` }), { optional: true }),
        query(':enter', stagger('300ms', [animate('600ms', style({ opacity: 1, transform: `translate3d(0,0,0)` }))]), { optional: true })
      ])
    ])
  ]
})
export class FavoritesPage implements OnInit {
  centrosFav: CentroAPI[];

  @ViewChild('slidingList') slidingList: IonItemSliding;

  constructor(
    public navCtrl: NavController,
    private service: PropertyService,
    private db: DatabaseService,
    private usuarioService: UsuarioService
  ) {
  }

  async ngOnInit() {

    await this.usuarioService.present('Cargando centros...');
    await this.db.obtenerCentrosFavAll().then(res => {
      this.centrosFav = res;
      console.log('CentrosFAV de db: ', this.centrosFav);

    }).catch(error => {

      console.log('Error al cargar favoritos: ', error);

    });
    this.usuarioService.dismiss();


  }

  itemTapped(favorite) {
    this.navCtrl.navigateForward('property-detail/' + favorite.property.id);
  }

  async deleteItem(centro: CentroAPI) {
    // this.usuarioService.borrarCentroFav(centro.IdCentroFav);
    const index = this.centrosFav.findIndex(cen => cen.Id === centro.Id);
    if (index > -1) {
      this.centrosFav.splice(index, 1);
    }
    await this.slidingList.close().then((a) => {
      console.log(a);
    });
  }

  async getFavorites() {
    await this.usuarioService.present('Cargando centros...');
    await this.db.obtenerCentrosFavAll().then(res => {
      this.centrosFav = res;

    }).catch(error => {

      console.log('Error al cargar favoritos: ', error);

    });
    this.usuarioService.dismiss();

  }

}
