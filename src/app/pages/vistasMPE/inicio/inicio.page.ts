import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { IonRouterOutlet, MenuController, ModalController, NavController, Platform, PopoverController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { EmpresaConsultor} from 'src/app/interfaces/usuario-interfaces';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NotificacionesPage } from '../notificaciones/notificaciones.page';
import { NgxXml2jsonService } from 'ngx-xml2json';

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
  noticias: Noticia[] = [
    {
      IdNoticia:        0,
      // tslint:disable-next-line: max-line-length
      Descripcion:      'El Ayuntamiento de Alcantarilla, encabezado por los representantes de toda la Corporación Municipal, ha mostrado hoy su rechazo hacia la violencia de género con la instalación en la Plaza San Pedro de 41 sillas vacías en memoria de cada una de las víctimas mortales en España en lo que va de año.',
      Titulo:           'Alcantarilla contra la violencia de genero',
      Url:              'https://www.alcantarilla.es/alcantarilla-muestra-su-rechazo-a-la-violencia-de-genero-con-41-sillas-que-simbolizan-a-las-victimas-mortales/',
      PathImagen:       'https://www.alcantarilla.es/wp-content/uploads/2020/11/20201125-FOTO-Dia-Violencia-G%C3%A9nero-2-1140x445.jpg',
      DescripcionCorta: 'Alcantarilla muestra su rechazo a la violencia de género con 41 sillas que simbolizan a las víctimas mortales',
      TipoNoticia:      'Noticia',
      TipoEmpleado:     'USUARIO',
      FechaInicio:      '2020-11-25T19:15:15',
      FechaFin:         null,
      URLYoutube:       'https://www.youtube.com/watch?v=35ijyfIvUUc'
    },
    {
      IdNoticia:        1,
      // tslint:disable-next-line: max-line-length
      Descripcion:      'El Ayuntamiento de Alcantarilla, encabezado por los representantes de toda la Corporación Municipal, ha mostrado hoy su rechazo hacia la violencia de género con la instalación en la Plaza San Pedro de 41 sillas vacías en memoria de cada una de las víctimas mortales en España en lo que va de año.',
      Titulo:           'El Pleno vota este jueves la modificación de una ordenanza municipal para limitar el uso de megafonía en la ciudad.',
      Url:              'https://www.alcantarilla.es/wp-content/uploads/2020/11/20201124-FOTO-Ayuntamiento-1140x445.jpg',
      PathImagen:       'https://www.alcantarilla.es/el-pleno-vota-este-jueves-la-modificacion-de-una-ordenanza-municipal-para-limitar-el-uso-de-megafonia-en-la-ciudad/',
      // tslint:disable-next-line: max-line-length
      DescripcionCorta: 'El Pleno del Ayuntamiento de Alcantarilla debatirá y votará el próximo jueves una modificación de la Ordenanza Reguladora de la Ocupación del Dominio Público para limitar el uso de megafonía dentro del término municipal y reducir la contaminación sonora.',
      TipoNoticia:      'Noticia',
      TipoEmpleado:     'USUARIO',
      FechaInicio:      '2020-11-25T19:15:15',
      FechaFin:         null,
      URLYoutube:       'https://www.youtube.com/watch?v=35ijyfIvUUc'
    }
  ];
  promociones: Noticia[];
  imagenDestacada: Noticia = {
    IdNoticia: 9999,
    Descripcion:      'imagen destacada',
    Titulo:           '',
    Url:              '',
    PathImagen:       'https://mpecronos.com/Documentos/imagenesMPE/promo.png',
    DescripcionCorta: '',
    TipoNoticia:      '',
    TipoEmpleado:     '',
    FechaInicio:      '',
    FechaFin:         '',
    URLYoutube:       '',
  };
  soportaFingerID: any;
  checkFinger: any;
  botonHuella: any;
  checkRemember: any;
  botonRecordarme: any;
  onLoginForm: any;
  hayCondiciones = false;
  // tslint:disable-next-line: max-line-length



  @ViewChild(IonRouterOutlet, { static : true }) routerOutlet: IonRouterOutlet;
  lastBack = Date.now();

  constructor(  private usuarioService: UsuarioService,
                public menuCtrl: MenuController,
                public navCtrl: NavController,
                public modalCtrl: ModalController,
                
    ) {
    this.usuario = this.usuarioService.getUsuario();

  }

  async ngOnInit() {

    console.log( 'this.usuario: ', this.usuario);

  }

  ionViewWillEnter() {
    this.usuario = this.usuarioService.getUsuario();
    console.log('Cantidad$ Notificacioens: ', this.Cantidad);
    this.menuCtrl.enable(true);

  }


  async notifications() {
    const modal = await this.modalCtrl.create({
      component: NotificacionesPage
        });
    return await modal.present();
  }



}
