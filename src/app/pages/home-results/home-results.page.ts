import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import {
  NavController,
  AlertController,
  MenuController,
  LoadingController,
  ToastController,
  PopoverController,
  ModalController } from '@ionic/angular';

import { PropertyService } from '../../providers';

import { SearchFilterPage } from '../../pages/modal/search-filter/search-filter.page';

import { NotificationsComponent } from './../../components/notifications/notifications.component';
import { UsuarioService } from '../../services/usuario.service';

import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations';
import { NgxXml2jsonService } from 'ngx-xml2json';
import { RespuestaCentroMPEInfo, RespuestaCentrosMPE, RespuestaCitasEmpleado, RespuestaCitasEmpleadoaInfo } from 'src/app/interfaces/interfaces-grupo-mpe';
import { CentroMPE } from '../../interfaces/interfaces-grupo-mpe';
import { CentrosMpeService } from '../../services/centros-mpe.service';
import { ViewWillEnter } from '@ionic/angular';
import { MapasService } from '../../services/mapas.service';
import { CentroAPI } from '../../interfaces/centros-interfaces';


@Component({
  selector: 'app-home-results',
  templateUrl: './home-results.page.html',
  styleUrls: ['./home-results.page.scss'],
  animations: [
    trigger('staggerIn', [
      transition('* => *', [
        query(':enter', style({ opacity: 0, transform: `translate3d(100px,0,0)` }), { optional: true }),
        query(':enter', stagger('200ms', [animate('400ms', style({ opacity: 1, transform: `translate3d(0,0,0)` }))]), { optional: true })
      ])
    ])
  ]
})
export class HomeResultsPage implements OnInit, ViewWillEnter {

  properties: Array<any>;
  searchKey = '';
  label = '';
  yourLocation = '463 Beacon Street Guest House';

  listaCentroMpe: CentroAPI[];

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public service: PropertyService,
    private router: Router,
    public usuarioService: UsuarioService,
    private ngxXml2jsonService: NgxXml2jsonService,
    private centrosMpeService: CentrosMpeService,
    private mapasService: MapasService
  ) {

  }

  ngOnInit() {
    this.listaCentroMpe = this.mapasService.getCentrosFiltrados();

  }

  ionViewWillEnter() {



  }

  mostrarInfoCentro(centro: CentroAPI) {

    this.mapasService.guardarCentroSeleccionado(centro);
    this.navCtrl.navigateForward('property-detail');

  }

  favorite(){}

  getCentrosMpe() {
    this.listaCentroMpe = this.mapasService.getCentrosGuardados();
  }
  settings() {
    this.navCtrl.navigateForward('settings');
  }

  onInput(event) {
    console.log(event.target.value);
    this.mapasService.findByName(event.target.value)
        .then(data => {
            this.listaCentroMpe = data;
        })
        .catch(error => alert(JSON.stringify(error)));
  }

  onCancel(event) {
    this.findAll();
  }

  findAll() {
    this.listaCentroMpe = this.mapasService.getCentrosGuardados();
  }

  async openPropertyListPage(label?: any) {
    const loader = await this.loadingCtrl.create({
      duration: 2000
    });

    loader.present();
    loader.onWillDismiss().then(() => {
      const navigationExtras: NavigationExtras = {
        state: {
          cat: '',
          label: label
        }
      };
      this.router.navigate(['property-list'], navigationExtras);
    });
  }

  async alertLocation() {
    const changeLocation = await this.alertCtrl.create({
      header: 'Change Location',
      message: 'Type your Address to change list in that area.',
      inputs: [
        {
          name: 'location',
          placeholder: 'Inserte nueva localización',
          type: 'text'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancelar clicked');
          }
        },
        {
          text: 'Change',
          handler: async (data) => {
            console.log('Change clicked', data);
            this.yourLocation = data.location;
            const toast = await this.toastCtrl.create({
              message: 'localizaciçon guardada!',
              duration: 3000,
              position: 'top',
              buttons: [
                {
                  text: 'Ok',
                  role: 'cancel',
                  handler: () => {
                    console.log('Cancelar clicked');
                  }
                }
              ]
            });

            toast.present();
          }
        }
      ]
    });
    changeLocation.present();
  }

  async searchFilter () {
    const modal = await this.modalCtrl.create({
      component: SearchFilterPage
    });
    return await modal.present();
  }

  async notifications() {
    const popover = await this.popoverCtrl.create({
      component: NotificationsComponent,
      animated: true,
      showBackdrop: true
    });
    return await popover.present();
  }

}
