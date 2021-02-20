import { Component, ViewChild} from '@angular/core';
// import { Router } from '@angular/router';

import { Platform, MenuController, NavController, IonRouterOutlet, ActionSheetController, PopoverController, ViewDidLeave, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { TranslateProvider } from './providers/translate/translate.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';

import { Pages } from './interfaces/pages';
import { UsuarioService } from './services/usuario.service';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { DatabaseService } from './services/database.service';
import { Notificacion, UsuarioLoginApi } from './interfaces/usuario-interfaces';
import { NotificacionesService } from './services/notificaciones.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import * as moment from 'moment';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';




@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild(IonRouterOutlet, { static : true }) routerOutlet: IonRouterOutlet;
  lastBack = Date.now();
  public usuario: UsuarioLoginApi;
  public appPages: Array<Pages>;
  public appPagesVSAll: Array<Pages>;
  
  public appPagesTrabajador: Array<Pages>;
  private HayModal = false;
  public appPagesGuardiaCivil: Array<Pages>;
  public Version = 'Versión 1.0.0';

  notificacion: Notificacion;

  constructor(
    private platform: Platform,
    private menu: MenuController,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateProvider,
    private translateService: TranslateService,
    private usuarioService: UsuarioService,
    private navCtrl: NavController,
    private db: DatabaseService,
    private fcm: FCM,
    private notificacionesService: NotificacionesService,
    public actionSheetController: ActionSheetController,
    private socialSharing: SocialSharing,
    private popoverController: PopoverController,
    private alertCtrl: AlertController,
    private localNotifications: LocalNotifications
    // public router: Router
  ) {

    this.appPagesTrabajador = [

      {
        title: 'Calendario',
        url: '/construccion',
        direct: 'forward',
        icon: 'clipboard-outline'
      },
      {
        title: 'Incidencias',
        url: '/contacto-mpe',
        direct: 'forward',
        icon: 'chatbubbles-outline'
      }
     /*  {
        title: 'Tareas',
        url: '/tareas-inicio',
        direct: 'forward',
        icon: 'document-outline'
      }, 
      {
        title: 'Planificación',
        url: '/construccion',
        direct: 'forward',
        icon: 'timer-outline'
      }*/

    ];

    /* this.appPagesGuardiaCivil = [
      {
        title: 'Formularios',
        url: '/construccion',
        direct: 'forward',
        icon: 'school-outline'
      },
      {
        title: 'Reconocimientos Médicos',
        url: '/construccion',
        direct: 'forward',
        icon: 'document-outline'
      },
      {
        title: 'Pruebas de Mantoux',
        url: '/construccion',
        direct: 'forward',
        icon: 'document-text-outline'
      },
      {
        title: 'Pruebas COVID',
        url: '/construccion',
        direct: 'forward',
        icon: 'clipboard-outline'
      },
      {
        title: 'Citas Pendientes',
        url: '/construccion',
        direct: 'forward',
        icon: 'timer-outline'
      },


    ]; */

    this.appPagesVSAll = [
      {
        title: 'Certificado de Aptitud',
        url: '/construccion',
        direct: 'forward',
        icon: 'document-outline'
      },
      {
        title: 'Planificación VS',
        url: '/construccion',
        direct: 'forward',
        icon: 'calendar-outline'
      },
      {
        title: 'Memoria Anual',
        url: '/construccion',
        direct: 'forward',
        icon: 'folder-outline'
      },
      {
        title: 'Estudio Epidemiológico',
        url: '/construccion',
        direct: 'forward',
        icon: 'flask-outline'
      },
      {
        title: 'Citas Pendientes',
        url: '/construccion',
        direct: 'forward',
        icon: 'timer-outline'
      },
      {
        title: 'Asistencia',
        url: '/construccion',
        direct: 'forward',
        icon: 'help-buoy'
      },
      {
        title: 'Historial Documentos',
        url: '/construccion',
        direct: 'forward',
        icon: 'clipboard-outline'
      }
    ];

    this.appPages = [
      {
        title: 'Buscar Centro MPE',
        url: '/construccion',
        direct: 'forward',
        icon: 'map-outline'
      },
      {
        title: 'Centros Favoritos',
        url: '/construccion',
        direct: 'forward',
        icon: 'heart'
      }, {
        title: 'Configuración',
        url: '/construccion',
        direct: 'forward',
        icon: 'person-outline'
      }

    ];

    

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {


      setTimeout(() => {


        this.fcm.getInitialPushPayload().then(data => {
            console.log('data app closed ', data);
            if (data === undefined || data === null) {
              return;
            }
            console.log('Received app closed: ', data);
            console.log('TipoUsuario ' + data['TipoUsuario']);

            const notificacion: Notificacion = {
              IdNotificacion: 1,
              IdNotificacionAPI: 1,
              Fecha: moment().locale('es').format(),
              Titulo: '',
              Mensaje: '',
              Icono: '',
              Leido: 0,
              Ruta: '',
            };

            notificacion.Titulo = data['Titulo'];
            notificacion.Leido = 0;
            notificacion.Mensaje = data['Mensaje'];
            notificacion.Icono = 'mail-outline';
            notificacion.Ruta = '/message/';
            
            this.notificacion = notificacion;

            /* if (data['TipoUsuario'].toString().includes('TECNICO')) {

              switch (notificacion.TipoDocumento.toUpperCase()) {
                case 'INFORMACION':
                  notificacion.Icono = 'mail-outline';
                  notificacion.Ruta = '/message/';
                  break;
                case 'TAREA':
                  notificacion.Icono = 'document-text-outline';
                  notificacion.Ruta = '/tareas-inicio';
                  break;
                
                default:
                  notificacion.Icono = 'alert-circle-outline';
                  notificacion.Ruta = '/inicio';
                  break;
              }
            } */

            this.db.addNotificacion(notificacion);
        //  this.db.ModificarRutaNotificacion();
            this.notificacionesService.SumaUnaNotificaciones();
        });


        this.fcm.onNotification().subscribe(data => {
          if (data === undefined || data === null) {
            return;
          }
          if (data.wasTapped) {
            console.log('Received Segundo in background: ', data);
            const notificacion: Notificacion = {
              IdNotificacion: 1,
              IdNotificacionAPI: 1,
              Fecha: moment().locale('es').format(),
              Titulo: '',
              Mensaje: '',
              Icono: '',
              Leido: 0,
              Ruta: '',
            };

            notificacion.Titulo = data['Titulo'];
            notificacion.Leido = 0;
            notificacion.Mensaje = data['Mensaje'];
            notificacion.Icono = 'mail-outline';
            notificacion.Ruta = '/message/';
            this.notificacion = notificacion;

            /* if (data['TipoUsuario'].toString().includes('TECNICO')) {

              switch (notificacion.TipoDocumento.toUpperCase()) {
                case 'INFORMACION':
                  notificacion.Icono = 'mail-outline';
                  notificacion.Ruta = '/message/';
                  break;
                case 'TAREA':
                  notificacion.Icono = 'document-text-outline';
                  notificacion.Ruta = '/tareas-inicio';
                  break;
                
                default:
                  notificacion.Icono = 'alert-circle-outline';
                  notificacion.Ruta = '/inicio';
                  break;
              }
            } */
            this.db.addNotificacion(notificacion);
            this.notificacionesService.SumaUnaNotificaciones();

          } else {
            console.log('Received primer plano: ', data);

            const notificacion: Notificacion = {
              Fecha: moment().locale('es').format(),
              IdNotificacionAPI: 0,
              Titulo: '',
              Mensaje: '',
              Icono: '',
              Leido: 0,
              Ruta: '',
              
            };

            notificacion.Titulo = data['Titulo'];
            notificacion.Leido = 0;
            notificacion.Mensaje = data['Mensaje'];

            this.notificacion = notificacion;
            
            notificacion.Icono = 'mail-outline';
            notificacion.Ruta = '/message/';

           /*  if (data['TipoUsuario'].toString().includes('TECNICO')) {

              switch (notificacion.TipoDocumento.toUpperCase()) {
                case 'INFORMACION':
                  notificacion.Icono = 'mail-outline';
                  notificacion.Ruta = '/message/';
                  break;
                case 'TAREA':
                  notificacion.Icono = 'document-text-outline';
                  notificacion.Ruta = '/tareas-inicio';
                  break;
                
                default:
                  notificacion.Icono = 'alert-circle-outline';
                  notificacion.Ruta = '/inicio';
                  break;
              }
            } */
            this.db.addNotificacion(notificacion);
            this.notificacionesService.SumaUnaNotificaciones();
            this.usuarioService.presentAlertNotificaciones('NUEVA NOTIFICACIÓN!!', 'Tiene una notificación nueva!!', '');

          }
        });

        this.statusBar.styleDefault();

        setTimeout(() => {
          this.splashScreen.hide();
        }, 1000);

        this.translateService.setDefaultLang(environment.language);
        this.translateService.use(environment.language);
        this.translateService.getTranslation(environment.language).subscribe(translations => {
          this.translate.setTranslations(translations);
        });
        this.backButtonEvent();
    }, 100);
    }).catch(() => {
      // Set language of the app.
      this.translateService.setDefaultLang(environment.language);
      this.translateService.use(environment.language);
      this.translateService.getTranslation(environment.language).subscribe(translations => {
        this.translate.setTranslations(translations);
      });
    });

    /* this.platform.pause.subscribe(() => {

      if (!this.usuarioService.desactivarSegundoPlano) {
        console.log('PASAMOS A SEGUNDO PLANO');
        this.navCtrl.navigateRoot('');
      }

    });
    this.platform.resume.subscribe(() => {
      console.log('VUELVE A PRIMER PLANO');
    }); */

  }

  backButtonEvent() {
    this.platform.backButton.subscribeWithPriority(0, async () => {
      await this.CerrarPopoOvr();
      if (this.routerOutlet.canGoBack()) {
        console.log('Vista Fichar');
        this.navCtrl.navigateRoot('/tareas-inicio');
      } else {
        await this.CerrarPopoOvr();
        if (this.HayModal === false && Date.now() - this.lastBack > 500) {
            this.closeMenu();
/*          navigator['app'].exitApp();
 */        }
        this.lastBack = Date.now();
      }
      this.usuarioService.dismiss();
    });
  }

  async CerrarPopoOvr() {
    const popover = await this.popoverController.getTop();
        if (popover) {
            this.HayModal = true;
            popover.dismiss();
        } else {
          this.HayModal = false;
        }
       // this.navCtrl.navigateRoot('/tab-inicio');
  }

  closeMenu() {
    this.usuarioService.presentAlertSalir('Información', '', '¿Quieres usted salir de la aplicación?');
    // this.menu.close();
    // navigator['app'].exitApp();
  }

  inicioMenu() {
    this.navCtrl.navigateRoot('tareas-inicio');
  }  

  editarPerfil() {
    this.navCtrl.navigateForward('edit-profile');
  }

  contactoMpe() {
    this.navCtrl.navigateForward('contacto-mpe');
  }

  abrirNubeMPE() {
    window.open('https://grupompe.es/MpeNube/Login.aspx', '_system');
  }

  proteccionGuardiaCivil() {
    window.open('https://www.alcantarilla.es/', '_system');
  }



  proteccionGenerico() {
    window.open('https://www.alcantarilla.es/', '_system');

  }

  terminosCondiciones() {

    window.open('https://www.alcantarilla.es/', '_system');

  }

  cerrarSesion() {
    this.usuarioService.presentAlertCerrarSesion('Información', '', '¿Quieres usted cerrar su sesión de usuario?');
  }

  crearNotificacionesLocalesMantoux(fecha: string, not: Notificacion) {

    const fechaPrueba = moment(fecha);
    console.log('fecha notificacion: ', fechaPrueba.format());
    const fecha48h = moment(fechaPrueba.add(48, 'hours'));
    const fecha72h = moment(fechaPrueba.add(24, 'hours'));
    const fecha3d17h = moment(fecha72h.format('L') + ' 17:00');
    const fechaActual = moment().locale('es');
    console.log('fecha actual: ', fechaActual.format());
    console.log('fecha 48h ', fecha48h.format());
    console.log('fecha 72h ', fecha72h.format());
    console.log('fecha 72h a las 17: ', fecha3d17h.format());
    if (fechaActual <= fecha3d17h ) {

      // CREAMOS PRIMER GRUPO DE NOTIFICACIONES

      for (let i = 0; i < 4; i++) {
        console.log('CREAMOS PRIMER DIA DE NOTIFICACIONES');

        const año = moment(fecha48h).year();
        const mes = moment(fecha48h).month();
        const dia = moment(fecha48h).date();

        console.log('año: ', año);
        console.log('mes: ', mes);
        console.log('dia: ', dia);

        switch (i) {
          case 0:
            // tslint:disable-next-line: no-shadowed-variable
            const notificacionHora8 = fecha48h.format('L') + ' 8:00'; // Cambiar esta fecha a la fecha de la not limite osea a las 8:00

            console.log('notificacionHora8 - 0:' , moment(notificacionHora8));
            console.log('fechaActual: ', fechaActual);

            if (fechaActual < moment(notificacionHora8)) {

              console.log('CREAMOS NOT DE LAS 8:00: ', new Date(año, mes, dia, 8, 0).toLocaleString());

              this.localNotifications.schedule({
                id: Math.round(Math.random() * 10000),
                title: 'Recuerde: Prueba Médica Mantoux',
                text: 'ALERTA: Le recordamos que durante el día de hoy debe realizarse la fotografía para su diagnóstico de la prueba de Mantoux',
                trigger: { at: new Date(año, mes, dia, 8, 0), count: 9999  },

              });

            } else {

              console.log('No creamos la notificación porque se hizo la prueba despues de las 8:00 de la mañana.  - 0');

            }
            break;

          case 1:
            console.log('fecha48h ', fecha48h);
            const notificacionHora11 = fecha48h.format('L') + ' 11:00';
            console.log('notificacionHora11: - 1' , moment(notificacionHora11).format());
            const fechaNot1 = new Date(notificacionHora11);
            console.log('FICHAPRUEBA: - 1', fechaNot1);

            if (fechaActual < moment(notificacionHora11)) {

              console.log('CREAMOS NOT DE LAS 11:00: ', new Date(año, mes, dia, 11, 0).toLocaleString());

              this.localNotifications.schedule({
                id: Math.round(Math.random() * 10000),
                title: 'Recuerde: Prueba Médica Mantoux',
                text: 'ALERTA: Le recordamos que durante el día de hoy debe realizarse la fotografía para su diagnóstico de la prueba de Mantoux',
                trigger: { at: new Date(año, mes, dia, 11, 0), count: 9999  },

              });


            } else {

              console.log('No creamos la notificación porque se hizo la prueba despues de las 11:00 de la mañana. - 1');

            }

            break;

          case 2:
            const notificacionHora14 = fecha48h.format('L') + ' 14:00';
            console.log('notificacionHora14: - 2' , moment(notificacionHora14).format());
            const fechaNot2 = new Date(notificacionHora14);
            console.log('FICHAPRUEBA: - 2', fechaNot2);

            if (fechaActual < moment(notificacionHora14)) {

              console.log('CREAMOS NOT DE LAS 14:00: ', new Date(año, mes, dia, 14, 0).toLocaleString());

              this.localNotifications.schedule({
                id: Math.round(Math.random() * 10000),
                title: 'Recuerde: Prueba Médica Mantoux',
                text: 'ALERTA: Le recordamos que durante el día de hoy debe realizarse la fotografía para su diagnóstico de la prueba de Mantoux',
                trigger: { at: new Date(año, mes, dia, 14, 0), count: 9999  },

              });


            } else {

              console.log('No creamos la notificación porque se hizo la prueba despues de las 14:00 de la tarde. - 2');

            }
            break;

          case 3:
            const notificacionHora17 = fecha48h.format('L') + ' 17:00';
            console.log('notificacionHora17: - 3' , moment(notificacionHora17).format());
            const fechaNot3 = new Date(notificacionHora17);
            console.log('FICHAPRUEBA: - 3', fechaNot3);

            if (fechaActual < moment(notificacionHora17)) {
              console.log('CREAMOS NOT DE LAS 17:00: ', new Date(año, mes, dia, 17, 0).toLocaleString());

              this.localNotifications.schedule({
                id: Math.round(Math.random() * 10000),
                title: 'Recuerde: Prueba Médica Mantoux',
                text: 'ALERTA: Le recordamos que durante el día de hoy debe realizarse la fotografía para su diagnóstico de la prueba de Mantoux',
                trigger: { at: new Date(año, mes, dia, 17, 0), count: 9999  },

              });


            } else {

              console.log('No creamos la notificación porque se hizo la prueba despues de las 17:00 de la tarde. - 3');

            }
            break;

          default:
            console.log('Caso null');
          break;
        }

      }

      // CREAMOS SEGUNDO GRUPO DE NOTIFICACIONES

      for (let i = 0; i < 4; i++) {

        const año2 = moment(fecha72h).year();
        const mes2 = moment(fecha72h).month();
        const dia2 = moment(fecha72h).date();

        console.log('año: ', año2);
        console.log('mes: ', mes2);
        console.log('dia: ', dia2);

        switch (i) {
          case 0:
            // tslint:disable-next-line: no-shadowed-variable
            const notificacionHora8 = fecha72h.format('L') + ' 08:00';
            console.log('notificacionHora8: - 4' , moment(notificacionHora8).format());
            const fechaNot0 = new Date(notificacionHora8);
            console.log('FICHAPRUEBA: - 4', fechaNot0);

            if (fechaActual < moment(notificacionHora8)) {

              console.log('CREAMOS NOT DE LAS 8:00: ', new Date(año2, mes2, dia2, 8, 0).toLocaleString());

              this.localNotifications.schedule({
                id: Math.round(Math.random() * 10000),
                title: 'Recuerde: Prueba Médica Mantoux',
                text: 'ALERTA: Le recordamos que hoy es el último día para realizarse la fotografía para su diagnóstico de la prueba de Mantoux',
                trigger: { at: new Date(año2, mes2, dia2, 8, 0), count: 9999  },

              });

            } else {

              console.log('No creamos la notificación porque se hizo la prueba despues de las 8:00 de la mañana. - 4');

            }
            break;

          case 1:
            const notificacionHora11 = fecha72h.format('L') + ' 11:00';
            console.log('notificacionHora11: - 5' , moment(notificacionHora11).format());
            const fechaNot1 = new Date(notificacionHora11);
            console.log('FICHAPRUEBA: - 5', fechaNot1);

            if (fechaActual < moment(notificacionHora11)) {

              console.log('CREAMOS NOT DE LAS 11:00 DIA DOS: ', new Date(año2, mes2, dia2, 2, 0).toLocaleString());

              this.localNotifications.schedule({
                id: Math.round(Math.random() * 10000),
                title: 'Recuerde: Prueba Médica Mantoux',
                text: 'ALERTA: Le recordamos que hoy es el último día para realizarse la fotografía para su diagnóstico de la prueba de Mantoux',
                trigger: { at: new Date(año2, mes2, dia2, 11, 0), count: 9999  },

              });


            } else {

              console.log('No creamos la notificación porque se hizo la prueba despues de las 8:00 de la mañana. - 5');

            }

            break;

          case 2:
            const notificacionHora14 = fecha72h.format('L') + ' 14:00';
            console.log('notificacionHora14: - 6' , moment(notificacionHora14).format());
            const fechaNot2 = new Date(notificacionHora14);
            console.log('FICHAPRUEBA: - 6', fechaNot2);

            if (fechaActual < moment(notificacionHora14)) {
              console.log('CREAMOS NOT DE LAS 14:00 DIA DOS: ', new Date(año2, mes2, dia2, 14, 0).toLocaleString());

              this.localNotifications.schedule({
                id: Math.round(Math.random() * 10000),
                title: 'Recuerde: Prueba Médica Mantoux',
                text: 'ALERTA: Le recordamos que pasado el plazo de 72 horas y no proceder a la realización de la fotografía para su diagnóstico, dicha prueba se considerará invalida sin ninguna responsabilidad para Grupo MPE.',
                trigger: { at: new Date(año2, mes2, dia2, 14, 0), count: 9999  },
              });

            } else {

              console.log('No creamos la notificación porque se hizo la prueba despues de las 8:00 de la mañana. - 6');

            }
            break;

          case 3:
            const notificacionHora17 = fecha72h.format('L') + ' 17:00';
            console.log('notificacionHora17: - 7' , moment(notificacionHora17).format());
            const fechaNot3 = new Date(notificacionHora17);
            console.log('FICHAPRUEBA: - 7', fechaNot3);

            if (fechaActual < moment(notificacionHora17)) {

              console.log('CREAMOS NOT DE LAS 17:00 DIA DOS: ', new Date(año2, mes2, dia2, 17, 0).toLocaleString());

              this.localNotifications.schedule({
                id: Math.round(Math.random() * 10000),
                title: 'Recuerde: Prueba Médica Mantoux',
                text: 'ALERTA: Le recordamos que pasado el plazo de 72 horas y no proceder a la realización de la fotografía para su diagnóstico, dicha prueba se considerará invalida sin ninguna responsabilidad para Grupo MPE.',
                trigger: { at: new Date(año2, mes2, dia2, 17, 0), count: 9999  },
              });

            } else {

              console.log('No creamos la notificación porque se hizo la prueba despues de las 8:00 de la mañana. - 7');

            }
            break;

          default:
            console.log('Caso null');
          break;
        }

      }
    }

  }

  salirApp() {

    navigator['app'].exitApp();
  }

  
}
