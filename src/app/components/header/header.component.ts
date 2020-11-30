import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioLogin } from 'src/app/interfaces/usuario-interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { ViewWillEnter, MenuController, ModalController, Platform, ActionSheetController } from '@ionic/angular';
import { NotificacionesService } from '../../services/notificaciones.service';
import { NotificacionesPage } from 'src/app/pages/vistasMPE/notificaciones/notificaciones.page';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { UsuarioLoginApi } from '../../interfaces/usuario-interfaces';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, ViewWillEnter {
  usuario: UsuarioLoginApi;
  cantidad = 0;
  cantidad$: Observable<number>;
  isSmallPhone = false;

  EsGuardiaCivil = false;

  @Input() titulo = 'Alcantarilla';

  private textoCompartirAPP = 'Disfrute de la App de Grupo MPE de prevención de riesgos laborales, puede descargarla pinchando en el siguiente enlace. ';
  private urlCompartirAPP = 'https://mpeprevencion.com/qr-appmpe.html';

  constructor(  private usuarioService: UsuarioService,
                private notificacionesService: NotificacionesService,
                private menuCtrl: MenuController,
                private modalCtrl: ModalController,
                private platform: Platform,
                private actionSheetController: ActionSheetController,
                private socialSharing: SocialSharing) { }

  ngOnInit() {
    this.platform.ready().then(() => {
      console.log('Width: ' + this.platform.width());
      console.log('Height: ' + this.platform.height());
      if (this.platform.width() > 360) {
        this.isSmallPhone = true;
        console.log('Si es movil pequeño');

      } else {
        this.isSmallPhone = false;
        console.log('No es movil pequeño');

      }
    });

    this.usuario = this.usuarioService.getUsuario();


    this.notificacionesService.aumentarNotificaciones();
    this.cantidad$ = this.notificacionesService.getNotifiaciones$();
    this.cantidad$.subscribe(num => {
      console.log('Hola1: ', num);
      this.cantidad = num; });
    console.log('Cantidad$ Notificacioens: ', this.cantidad);
    this.menuCtrl.enable(true);

  }

  ionViewWillEnter() {
    console.log('Cantidad$ Notificacioens: 33 ', this.cantidad);

    this.notificacionesService.aumentarNotificaciones();
    console.log('Cantidad$ Notificacioens 222: ', this.cantidad);
    this.cantidad$ = this.notificacionesService.getNotifiaciones$();
    this.cantidad$.subscribe(num => this.cantidad = num);
    console.log('Cantidad$ Notificacioens: ', this.cantidad);
    this.menuCtrl.enable(true);
  }

  async notifications() {
    const modal = await this.modalCtrl.create({
      component: NotificacionesPage
        });
    return await modal.present();
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

  abrirNubeMPE() {
    window.open('https://grupompe.es/MpeNube/Login.aspx', '_system');
  }


}
