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
  private textoCompartirAPP = 'Disfrute de la App de GrupoMPE para la gestión laboral, puede descargarla pinchando en el siguiente enlace!!';
  private urlCompartirAPP = 'https://mpeprevencion.com/qr-appmpe.html';
  public Version = 'Versión 1.0.0';

  private notificacion: Notificacion;

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
      }

    ];

    this.appPagesGuardiaCivil = [
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


    ];

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

    this.platform.ready().then(() => {
      this.localNotifications.on('click').subscribe(notification => {
        console.log('click on notification fired');
        console.log('notification:', notification);

        const notificacion: Notificacion = {
          IdNotificacion: 1,
          Fecha: moment(new Date(notification.trigger.at)).format('L'),
          Titulo: notification.title,
          Mensaje: notification.text,
          Icono: 'medkit-outline',
          Leido: 0,
          Ruta: '/mensaje-mantoux',
          TipoDocumento: 'MANTOUX'
        };
        console.log('NOTIFICACION MANTOUX INICIO: ', notificacion);
        this.db.addNotificacion(notificacion);
        this.notificacionesService.SumaUnaNotificaciones();
        this.notificacionesService.guardarNotMantoux(notification);
        this.navCtrl.navigateForward('/mensaje-mantoux');
      });
    });

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
            const titulo = data['Titulo'];
            const tipoDocumento = data['TipoDocumento'];
            console.log('TITULO: ', titulo);
            const notificacion: Notificacion = {
              IdNotificacion: 1,
              Fecha: '',
              Titulo: '',
              Mensaje: '',
              Icono: '',
              Leido: 0,
              Ruta: '',
              TipoDocumento: ''
            };

            notificacion.Titulo = titulo;
            notificacion.Leido = 0;
            notificacion.Mensaje = data['Mensaje'];
            notificacion.Fecha = data['FechaNotificacion'];
            notificacion.TipoDocumento = data['TipoDocumento'];

            this.notificacion = notificacion;
            console.log('PRUEBA TRABAJADOR APPCOMPONENTS: ', data['TipoUsuario'].toString().includes('TRABAJADOR'));
            if (!data['TipoUsuario'].toString().includes('TRABAJADOR')) {
              console.log('tipoDocumento.toUpperCase( CLIENTE ) ', tipoDocumento.toUpperCase());
              switch (tipoDocumento.toUpperCase()) {
                case 'DOCUMENTO':
                  notificacion.Icono = 'document-text-outline';
                  notificacion.Ruta = '/certificado-aptitud-menu';
                  break;
                case 'HISTORICO':
                  notificacion.Icono = 'document-text-outline';
                  notificacion.Ruta = '/historial-notificaciones';
                  break;
                case 'MENSAJE':
                  notificacion.Icono = 'mail-outline';
                  notificacion.Ruta = '/message/';
                  break;
                case 'MANTOUX':
                    notificacion.Icono = 'medkit-outline';
                    notificacion.Ruta = '/mensaje-mantoux';
                    /* this.db.addNotificacion(notificacion);
                    //  this.db.ModificarRutaNotificacion();
                    this.notificacionesService.SumaUnaNotificaciones(); */
                    this.crearNotificacionesLocalesMantoux(notificacion.Fecha, notificacion);


                    const fechaPrueba = moment(notificacion.Fecha).format('DD/MM/YYYY');
                    const fecha48h = moment(notificacion.Fecha).add(2, 'days');

                   /*  this.presentAlertTestMantoux('ALERTA', ' Información sobre su prueba de Mantoux', 'A Vd. se le ha realizado con fecha ' + fechaPrueba +
                    ' una prueba de Mantoux, por lo que le comunicamos que entre el día ' + fecha48h.format('DD/MM/YYYY') + ' y el ' + fecha48h.add(1440, 'minutes').format('DD/MM/YYYY') +
                    ' debe proceder a realizarse una fotografía a través de ésta App para su diagnóstico. \n' + 'Esta App se lo recordara a través de notificaciones push durante el plazo indicado.');
                   */
                  break;
                default:
                  notificacion.Icono = 'alert-circle-outline';
                  notificacion.Ruta = '/certificado-aptitud-menu';
                  break;
              }
            } else {
              console.log('tipoDocumento.toUpperCase( TRABAJADOR ) ', tipoDocumento.toUpperCase());
              switch (tipoDocumento.toUpperCase()) {
                case 'DOCUMENTO':
                  notificacion.Icono = 'document-text-outline';
                  notificacion.Ruta = '/documentos-trabajador-menu';
                  break;
                case 'DOCUMENTO-COVID':
                  notificacion.Icono = 'document-text-outline';
                  notificacion.Ruta = '/documentos-covid-menu';
                  break;
                case 'MENSAJE':
                  notificacion.Icono = 'mail-outline';
                  notificacion.Ruta = '/message/';
                  break;
                case 'MANTOUX':
                  notificacion.Icono = 'medkit-outline';
                  notificacion.Ruta = '/mensaje-mantoux';
                  this.crearNotificacionesLocalesMantoux(notificacion.Fecha, notificacion);

                  const fechaPrueba = moment(notificacion.Fecha).format('DD/MM/YYYY');
                  const fecha48h = moment(notificacion.Fecha).add(2, 'days');
                 /*  this.db.addNotificacion(notificacion);
                  //  this.db.ModificarRutaNotificacion();
                  this.notificacionesService.SumaUnaNotificaciones(); */

                  /* this.presentAlertTestMantoux('ALERTA', ' Información sobre su prueba de Mantoux', 'A Vd. se le ha realizado con fecha ' + fechaPrueba +
                  ' una prueba de Mantoux, por lo que le comunicamos que entre el día ' + fecha48h.format('DD/MM/YYYY') + ' y el ' + fecha48h.add(1440, 'minutes').format('DD/MM/YYYY') +
                  ' debe proceder a realizarse una fotografía a través de ésta App para su diagnóstico. \n' + 'Esta App se lo recordara a través de notificaciones push durante el plazo indicado.');
                   */
                  break;
                default:
                  notificacion.Icono = 'alert-circle-outline';
                  notificacion.Ruta = '/documentos-trabajador-menu';
                  break;
              }
            }

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
            console.log('Tipo Documento ' + data['TipoDocumento']);
            console.log('TipoUsuario ' + data['TipoUsuario']);
            const titulo = data['Titulo'];
            const tipoDocumento = data['TipoDocumento'];
            console.log('TITULO: ', titulo);
            const notificacion: Notificacion = {
              IdNotificacion: 1,
              Fecha: '',
              Titulo: '',
              Mensaje: '',
              Icono: '',
              Leido: 0,
              Ruta: '',
              TipoDocumento: ''
            };

            notificacion.Titulo = titulo;
            notificacion.Leido = 0;
            notificacion.Mensaje = data['Mensaje'];
            notificacion.Fecha = data['FechaNotificacion'];
            notificacion.TipoDocumento = data['TipoDocumento'];

            this.notificacion = notificacion;

            console.log('PRUEBA TRABAJADOR APPCOMPONENTS: ', data['TipoUsuario'].toString().includes('TRABAJADOR'));
            if (!data['TipoUsuario'].toString().includes('TRABAJADOR')) {
              console.log('tipoDocumento.toUpperCase( CLIENTE ) ', tipoDocumento.toUpperCase());
              switch (tipoDocumento.toUpperCase()) {
                case 'DOCUMENTO':
                  notificacion.Icono = 'document-text-outline';
                  notificacion.Ruta = '/certificado-aptitud-menu';
                  break;
                case 'HISTORICO':
                  notificacion.Icono = 'document-text-outline';
                  notificacion.Ruta = '/historial-notificaciones';
                  break;
                case 'MENSAJE':
                  notificacion.Icono = 'mail-outline';
                  notificacion.Ruta = '/message/';
                  break;
                case 'MANTOUX':
                  notificacion.Icono = 'medkit-outline';
                  notificacion.Ruta = '/mensaje-mantoux';
                  this.crearNotificacionesLocalesMantoux(notificacion.Fecha, notificacion);

                  const fechaPrueba = moment(notificacion.Fecha).format('DD/MM/YYYY');
                  const fecha48h = moment(notificacion.Fecha).add(2, 'days');
                  /* this.db.addNotificacion(notificacion);
                  //  this.db.ModificarRutaNotificacion();
                  this.notificacionesService.SumaUnaNotificaciones(); */

                 /*  this.presentAlertTestMantoux('ALERTA', ' Información sobre su prueba de Mantoux', 'A Vd. se le ha realizado con fecha ' + fechaPrueba +
                  ' una prueba de Mantoux, por lo que le comunicamos que entre el día ' + fecha48h.format('DD/MM/YYYY') + ' y el ' + fecha48h.add(1440, 'minutes').format('DD/MM/YYYY') +
                  ' debe proceder a realizarse una fotografía a través de ésta App para su diagnóstico. \n' + 'Esta App se lo recordara a través de notificaciones push durante el plazo indicado.');
                   */
                  break;
                default:
                  notificacion.Icono = 'alert-circle-outline';
                  notificacion.Ruta = '/certificado-aptitud-menu';
                  break;
              }
            } else {
              console.log('tipoDocumento.toUpperCase( TRABAJADOR ) ', tipoDocumento.toUpperCase());
              switch (tipoDocumento.toUpperCase()) {
                case 'DOCUMENTO':
                  notificacion.Icono = 'document-text-outline';
                  notificacion.Ruta = '/documentos-trabajador-menu';
                  break;
                case 'DOCUMENTO-COVID':
                  notificacion.Icono = 'document-text-outline';
                  notificacion.Ruta = '/documentos-covid-menu';
                  break;
                case 'MENSAJE':
                  notificacion.Icono = 'mail-outline';
                  notificacion.Ruta = '/message/';
                  break;
                case 'MANTOUX':
                  notificacion.Icono = 'medkit-outline';
                  notificacion.Ruta = '/mensaje-mantoux';
                  this.crearNotificacionesLocalesMantoux(notificacion.Fecha, notificacion);

                  const fechaPrueba = moment(notificacion.Fecha).format('DD/MM/YYYY');
                  const fecha48h = moment(notificacion.Fecha).add(2, 'days');
                  /* this.db.addNotificacion(notificacion);
                  //  this.db.ModificarRutaNotificacion();
                  this.notificacionesService.SumaUnaNotificaciones();
 */
                  /* this.presentAlertTestMantoux('ALERTA', ' Información sobre su prueba de Mantoux', 'A Vd. se le ha realizado con fecha ' + fechaPrueba +
                  ' una prueba de Mantoux, por lo que le comunicamos que entre el día ' + fecha48h.format('DD/MM/YYYY') + ' y el  ' + fecha48h.add(1440, 'minutes').format('DD/MM/YYYY') +
                  ' debe proceder a realizarse una fotografía a través de ésta App para su diagnóstico. \n' + 'Esta App se lo recordara a través de notificaciones push durante el plazo indicado.');
                   */
                  break;
                default:
                  notificacion.Icono = 'alert-circle-outline';
                  notificacion.Ruta = '/documentos-trabajador-menu';
                  break;
              }
            }
            this.db.addNotificacion(notificacion);
            this.notificacionesService.SumaUnaNotificaciones();

          } else {
            console.log('Received primer plano: ', data);

            const titulo = data['title'];
            const tipoDocumento = data['TipoDocumento'];
            console.log('TITULO: ', titulo);
            const notificacion: Notificacion = {
              IdNotificacion: 1,
              Fecha: '',
              Titulo: '',
              Mensaje: '',
              Icono: '',
              Leido: 0,
              Ruta: '',
              TipoDocumento: ''
            };

            notificacion.Titulo = titulo;
            notificacion.Leido = 0;
            notificacion.Mensaje = data['Mensaje'];
            notificacion.Fecha = data['FechaNotificacion'];
            notificacion.TipoDocumento = data['TipoDocumento'];

            this.notificacion = notificacion;

            console.log('PRUEBA TRABAJADOR APPCOMPONENTS: ', data['TipoUsuario'].toString().includes('TRABAJADOR'));
            if (!data['TipoUsuario'].toString().includes('TRABAJADOR')) {
              console.log('tipoDocumento.toUpperCase( CLIENTE ) ', tipoDocumento.toUpperCase());
              switch (tipoDocumento.toUpperCase()) {
                case 'DOCUMENTO':
                  notificacion.Icono = 'document-text-outline';
                  notificacion.Ruta = '/certificado-aptitud-menu';
                  break;
                case 'HISTORICO':
                  notificacion.Icono = 'document-text-outline';
                  notificacion.Ruta = '/historial-notificaciones';
                  break;
                case 'MENSAJE':
                  notificacion.Icono = 'mail-outline';
                  notificacion.Ruta = '/message/';
                  break;
                case 'MANTOUX':
                  notificacion.Icono = 'medkit-outline';
                  notificacion.Ruta = '/mensaje-mantoux';
                  this.crearNotificacionesLocalesMantoux(notificacion.Fecha, notificacion);

                  const fechaPrueba = moment(notificacion.Fecha).format('DD/MM/YYYY');
                  const fecha48h = moment(notificacion.Fecha).add(2, 'days');
/*                   this.db.addNotificacion(notificacion);
                  //  this.db.ModificarRutaNotificacion();
                  this.notificacionesService.SumaUnaNotificaciones(); */

                 /*  this.presentAlertTestMantoux('ALERTA', ' Información sobre su prueba de Mantoux', 'A Vd. se le ha realizado con fecha ' + fechaPrueba +
                  ' una prueba de Mantoux, por lo que le comunicamos que entre el día ' + fecha48h.format('DD/MM/YYYY') + ' y el ' + fecha48h.add(1440, 'minutes').format('DD/MM/YYYY') +
                  ' debe proceder a realizarse una fotografía a través de ésta App para su diagnóstico. \n' + 'Esta App se lo recordara a través de notificaciones push durante el plazo indicado.');
                   */
                  break;
                default:
                  notificacion.Icono = 'alert-circle-outline';
                  notificacion.Ruta = '/certificado-aptitud-menu';
                  break;
              }
            } else {
              console.log('tipoDocumento.toUpperCase( TRABAJADOR ) ', tipoDocumento.toUpperCase());
              switch (tipoDocumento.toUpperCase()) {
                case 'DOCUMENTO':
                  notificacion.Icono = 'document-text-outline';
                  notificacion.Ruta = '/documentos-trabajador-menu';
                  break;
                case 'DOCUMENTO-COVID':
                  notificacion.Icono = 'document-text-outline';
                  notificacion.Ruta = '/documentos-covid-menu';
                  break;
                case 'MENSAJE':
                  notificacion.Icono = 'mail-outline';
                  notificacion.Ruta = '/message/';
                  break;
                case 'MANTOUX':
                  notificacion.Icono = 'medkit-outline';
                  notificacion.Ruta = '/mensaje-mantoux';
                  this.crearNotificacionesLocalesMantoux(notificacion.Fecha, notificacion);

                  const fechaPrueba = moment(notificacion.Fecha).format('DD/MM/YYYY');
                  const fecha48h = moment(notificacion.Fecha).add(2, 'days');
                  /* this.db.addNotificacion(notificacion);
                  //  this.db.ModificarRutaNotificacion();
                  this.notificacionesService.SumaUnaNotificaciones(); */

                  /* this.presentAlertTestMantoux('ALERTA', ' Información sobre su prueba de Mantoux', 'A Vd. se le ha realizado con fecha ' + fechaPrueba +
                  ' una prueba de Mantoux, por lo que le comunicamos que entre el día ' + fecha48h.format('DD/MM/YYYY') + ' y el ' + fecha48h.add(1440, 'minutes').format('DD/MM/YYYY') +
                  ' debe proceder a realizarse una fotografía a través de ésta App para su diagnóstico. \n' + 'Esta App se lo recordara a través de notificaciones push durante el plazo indicado.');
                   */
                  break;
                default:
                  notificacion.Icono = 'alert-circle-outline';
                  notificacion.Ruta = '/documentos-trabajador-menu';
                  break;
              }
            }
            this.db.addNotificacion(notificacion);
            this.notificacionesService.SumaUnaNotificaciones();
            if (tipoDocumento.toUpperCase() !== 'MANTOUX') {
              this.usuarioService.presentAlertNotificaciones('NUEVA NOTIFICACIÓN!!', 'Tiene una notificación nueva!!', '');
            }
          }
        });
        this.statusBar.styleDefault();
        setTimeout(() => {
          this.splashScreen.hide();
        }, 1000);
        // this.splashScreen.hide();
        // Set language of the app.
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
        this.navCtrl.navigateRoot('/inicio');
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
    this.navCtrl.navigateRoot('inicio');
  }

  
  async someAsyncOperation() {
    // await this.navController.navigateForward("/test");
  }





  async compartirAPP() {
    try {
    const actionSheet = await this.actionSheetController.create({
      header: 'Compartir APP',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Facebook',
        icon: 'logo-facebook',
        handler: () => {
          console.log('Lanzamos Facebook');
            // Sharing via email is possible
            this.socialSharing.shareViaFacebook('https://mpeprevencion.com/qr-appmpe.html', null, null).then( () => {
              console.log('Then Lanzamos Facebook');
            }).catch( error => {
              console.log('error Facebook', error);
            });
        }
      }, {
        text: 'Twitter',
        icon: 'logo-twitter',
        handler: () => {
          console.log('Lanzamos Twitter');
          this.socialSharing.shareViaTwitter(this.textoCompartirAPP, 'https://mpecronos.com/Documentos/Descarga/icn-app-mpe.jpg', this.urlCompartirAPP).then( () => {



          }).catch( error => {
            console.log('Lanzamos Twitter error', error);
            this.usuarioService.presentAlert('Error', 'No tiene la app de Twitter en su móvil', 'Descarguela y pruebe de nuevo, gracias.');

            });
          }
        }, {
          text: 'Whatsapp',
          icon: 'logo-whatsapp',
          handler: () => {
            console.log('Lanzamos Whatsapp');
            this.socialSharing.shareViaWhatsApp(this.textoCompartirAPP, 'https://mpecronos.com/Documentos/Descarga/icn-app-mpe.jpg', this.urlCompartirAPP).then( () => {



            }).catch( error => {

            console.log('Lanzamos Whatsapp error', error);
            this.usuarioService.presentAlert('Error', 'No tiene la app de Whatsapp en su móvil', 'Descarguela y pruebe de nuevo, gracias.');


          });
        }
      }, {
        text: 'Email',
        icon: 'mail-outline',
        handler: () => {
          console.log('Lanzamos Email');
          this.socialSharing.shareViaEmail(this.textoCompartirAPP + ':' + this.urlCompartirAPP, 'Descarga la App de prevención de Grupo MPE', null).then( () => {


            }).catch( error => {



            });
          }
        }, {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
      });

      await actionSheet.present();
    } catch (error) {
        console.log('Fallo al cargar ');
    }
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
