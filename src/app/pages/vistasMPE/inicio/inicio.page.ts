import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { IonRouterOutlet, MenuController, ModalController, NavController, Platform, PopoverController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { EmpresaConsultor} from 'src/app/interfaces/usuario-interfaces';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NotificacionesPage } from '../notificaciones/notificaciones.page';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';

import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations';
import { PopoverAvisarEditPerfilComponent } from '../../../components/popover-avisar-edit-perfil/popover-avisar-edit-perfil.component';
import * as moment from 'moment';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { DatabaseService } from '../../../services/database.service';
import { UsuarioLoginApi } from '../../../interfaces/usuario-interfaces';
import { Noticia } from 'src/app/interfaces/noticias-interfaces';
import { NoticiasService } from '../../../services/noticias.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  animations: [
    trigger('staggerIn', [
      transition('* => *', [
        query(':enter', style({ opacity: 0, transform: `translate3d(100px,0,0)` }), { optional: true }),
        query(':enter', stagger('150ms', [animate('250ms', style({ opacity: 1, transform: `translate3d(0,0,0)` }))]), { optional: true })
      ])
    ])
  ]
})
export class InicioPage implements OnInit {

  usuario: UsuarioLoginApi;
  empresaCoonsultor: EmpresaConsultor;
  hayConsultor = false;
  Cantidad = 0;
  cantidad$: Observable<number>;
  isSmallPhone = false;
  header = new HttpHeaders().set('Content-Type', 'application/json');
  imagenDestacada: string = "assets/img/logoAlcantarillaTransparente.png";
  noticias: Noticia[] = [
    {
      IdNoticia:        0,
      // tslint:disable-next-line: max-line-length
      Descripcion:      'El Ayuntamiento de Alcantarilla, encabezado por los representantes de toda la Corporación Municipal, ha mostrado hoy su rechazo hacia la violencia de género con la instalación en la Plaza San Pedro de 41 sillas vacías en memoria de cada una de las víctimas mortales en España en lo que va de año.',
      Titulo:           'Alcantarilla contra la violencia de genero',
      Url:              'https://www.alcantarilla.es/alcantarilla-muestra-su-rechazo-a-la-violencia-de-genero-con-41-sillas-que-simbolizan-a-las-victimas-mortales/',
      PathImagen:       'https://www.alcantarilla.es/wp-content/uploads/2020/11/20201125-FOTO-Dia-Violencia-G%C3%A9nero-2-1140x445.jpg',
      DescripcionCorta: 'Alcantarilla muestra su rechazo a la violencia de género con 41 sillas que simbolizan a las víctimas mortales',
      FechaInicio:      '2020-11-25T19:15:15',
      URLYoutube:       'https://www.youtube.com/embed/hoB6wYSg37g'
    },
    {
      IdNoticia:        1,
      // tslint:disable-next-line: max-line-length
      Descripcion:      'El Ayuntamiento de Alcantarilla, encabezado por los representantes de toda la Corporación Municipal, ha mostrado hoy su rechazo hacia la violencia de género con la instalación en la Plaza San Pedro de 41 sillas vacías en memoria de cada una de las víctimas mortales en España en lo que va de año.',
      Titulo:           'El Pleno vota este jueves la modificación de una ordenanza municipal para limitar el uso de megafonía en la ciudad.',
      Url:              'https://www.alcantarilla.es/el-pleno-vota-este-jueves-la-modificacion-de-una-ordenanza-municipal-para-limitar-el-uso-de-megafonia-en-la-ciudad/',
      PathImagen:       'https://www.alcantarilla.es/wp-content/uploads/2020/11/20201124-FOTO-Ayuntamiento-1140x445.jpg',
      // tslint:disable-next-line: max-line-length
      DescripcionCorta: 'El Pleno del Ayuntamiento de Alcantarilla debatirá y votará el próximo jueves una modificación de la Ordenanza Reguladora de la Ocupación del Dominio Público para limitar el uso de megafonía dentro del término municipal y reducir la contaminación sonora.',
      FechaInicio:      '2020-11-25T19:15:15',
      URLYoutube:       null
    }
  ];
  promociones: Noticia[];

  soportaFingerID: any;
  checkFinger: any;
  botonHuella: any;
  checkRemember: any;
  botonRecordarme: any;
  onLoginForm: any;
  hayCondiciones = false;

  tokenAPI: string;
  // tslint:disable-next-line: max-line-length



  @ViewChild(IonRouterOutlet, { static : true }) routerOutlet: IonRouterOutlet;
  lastBack = Date.now();

  constructor(  private usuarioService: UsuarioService,
                public menuCtrl: MenuController,
                public navCtrl: NavController,
                public modalCtrl: ModalController,
                private noticiasService: NoticiasService
                
    ) {
    this.usuario = this.usuarioService.getUsuario();

  }

  async ngOnInit() {

    /* await this.usuarioService.present('Cargando datos...');
    await this.noticiasService.getNoticias(this.usuario.IdUsuario).then( resp => {

      if (resp.Respuesta === 'OK') {
        console.log(resp);
        console.log('NOTICIAS resp: ', resp.Noticias);
        console.log('NOTICIAS resp : ', resp.Promocion);
        console.log('NOTICIAS: ', resp.Respuesta);
        if (resp.ImagenDestacada !== undefined) {
          this.imagenDestacada = resp.ImagenDestacada.PathImagen;
        }
        this.noticias = resp.Noticias;

      } else {

        this.usuarioService.presentAlert('ERROR', 'Fallo al cargar la información de inico', 'Intentelo de nuevo más tarde');
        console.log(resp);
      }
      this.usuarioService.dismiss();

    }).catch( error => {
      console.log(error);
      this.usuarioService.presentAlert('ERROR', 'Fallo al cargar la información de inico', 'Compruebe su conexión a internet');
      this.usuarioService.dismiss();
    }); */

  }

  ionViewWillEnter() {
    this.usuario = this.usuarioService.getUsuario();
    console.log('Cantidad$ Notificacioens: ', this.Cantidad);
    this.menuCtrl.enable(true);

  }

  masInfo(not: Noticia) {

    const navigationExtras: NavigationExtras = {
      queryParams: {
        noticia: JSON.stringify(not)
      }
    };

   this.navCtrl.navigateForward('/noticias-mas-info', navigationExtras);

  }


  async notifications() {
    const modal = await this.modalCtrl.create({
      component: NotificacionesPage
        });
    return await modal.present();
  }



}
