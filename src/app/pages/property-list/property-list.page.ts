import { Component } from '@angular/core';
import { NavController, ModalController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

import { PropertyService } from '../../providers';
import { SearchFilterPage } from '../modal/search-filter/search-filter.page';
import { environment } from '../../../environments/environment';

import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.page.html',
  styleUrls: ['./property-list.page.scss'],
  animations: [
    trigger('staggerIn', [
      transition('* => *', [
        query(':enter', style({ opacity: 0, transform: `translate3d(0,10px,0)` }), { optional: true }),
        query(':enter', stagger('500ms', [animate('800ms', style({ opacity: 1, transform: `translate3d(0,0,0)` }))]), { optional: true })
      ])
    ])
  ]
})

export class PropertyListPage {
  properties: Array<any>;
  searchKey: string;
  viewMode = 'list';
  proptype: any;
  label: any;
  from: String;
  agmStyles: any[] = environment.agmStyles;

  catList: Array<any> = [
    {
      label: 'Todos',
      value: ''
    },
    {
      label: 'Madrid',
      value: 'suburban'
    },
    {
      label: 'Barcelona',
      value: 'colonial'
    },
    {
      label: 'Sevilla',
      value: 'contemporary'
    },
    {
      label: 'Murcia',
      value: 'victorian'
    },
    {
      label: 'Valencia',
      value: 'farm'
    },
    {
      label: 'Alicante',
      value: 'modern'
    },
    {
      label: 'Malaga',
      value: 'beach'
    }
  ];

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public service: PropertyService,
    public toastCtrl: ToastController,
    public route: ActivatedRoute,
    public router: Router
  ) {
    this.findAll();

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.proptype = this.router.getCurrentNavigation().extras.state.cat;
        this.label = this.router.getCurrentNavigation().extras.state.label;
      }
    });
  }

  ionViewWillEnter() {

  }

  settings() {
    this.navCtrl.navigateForward('settings');
  }

  onInput(event) {
    this.service.findByName(this.searchKey)
        .then(data => {
            this.properties = data;
        })
        .catch(error => alert(JSON.stringify(error)));
  }

  onCancel(event) {
    this.findAll();
  }

  async findAll() {
    await this.service.findAll()
          .then(data => this.properties = data)
          .catch(error => alert(error));

  }

  favorite(property) {
    this.service.favorite(property)
        .then(async res => {
            const toast = await this.toastCtrl.create({
                message: 'Centro agregado a favoritos',
                duration: 2000,
                position: 'bottom',
                buttons: [
                  {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: () => {
                      console.log('Cancelar clicked');
                    }
                  }
                ]
            });

            toast.present();
        });
  }

  async searchFilter () {
    const modal = await this.modalCtrl.create({
      component: SearchFilterPage
    });
    return await modal.present();
  }

}
