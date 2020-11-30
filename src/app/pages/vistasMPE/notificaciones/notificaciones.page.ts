import { Component, OnInit } from '@angular/core';
import { Notificaciones, Notificacion, UsuarioLoginApi } from 'src/app/interfaces/usuario-interfaces';
import { MessageService } from 'src/app/providers';
import { NavController, ModalController, ToastController } from '@ionic/angular';

import { UsuarioService } from 'src/app/services/usuario.service';
import { DatabaseService } from 'src/app/services/database.service';
import { async } from 'rxjs/internal/scheduler/async';
import * as moment from 'moment';
import { UsuarioLogin } from '../../../interfaces/usuario-interfaces';
import { NotificacionesService } from '../../../services/notificaciones.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage implements OnInit {

  messages: Array<any> = [];

  listaNotificaciones: Array<Notificaciones> = [];
  listaMensajes: Array<Notificacion> = [];
  usuario: UsuarioLoginApi;



  constructor(
    public messageService: MessageService,
    public modalCtrl: ModalController,
    private usuarioService: UsuarioService,
    private navController: NavController,
    private db: DatabaseService,
    private notificacionesService: NotificacionesService
  ) {}


  async ngOnInit() {
    this.usuario = this.usuarioService.getUsuario();
    await this.getNotificaciones();
  }
    async getNotificaciones() {
    this.usuarioService.present('Cargando notificaciones...');

    await this.db.obtenerTodasNotificacion().then( async res => {

      console.log('FICHAR: respuestaBD motivos: ', res);
      this.listaMensajes = res;
      if (res.length === 0) {
        this.getSinNotificaciones();
      }
      this.usuarioService.dismiss();
    }).catch(() => {
      this.usuarioService.dismiss();
      console.log('FICHAR ERROR: Obtener Lista Motivos');
      this.getSinNotificaciones();
    });
    // AQUI CARGO LISTA NOTIFICACION DE BD
    // SI LA LISTA ES VACIA CREO NOTIFICACION DE NO HAY NOTIFICACIONES
  }

  getSinNotificaciones() {

      const notificacion = {
        IdNotificacion: 1,
        Titulo: 'No tienes notificaciones',
        Icono: 'notifications-off-outline',
        Ruta: '/',
        Mensaje: 'No hay notificaciones nuevas',
        Fecha:  moment().format('YYYY-MM-DDT00:00:00'),
        Leido: 1,
        TipoDocumento: 'Docuemento'
      };
      this.listaMensajes.push(notificacion);
      return this.listaMensajes;
  }

  delete(notificacion: Notificacion) {
    this.db.BorrarNotificacion(notificacion.IdNotificacion);
    this.usuarioService.presentToast('Notificación eliminada correctamente.');
    this.modalCtrl.dismiss();
  }


  getMessages() {
    this.messages = this.messageService.getMessages();
  }
   MarcarComoLeidas() {
    this.db.marcarTodasNotificacionLeidas();
    this.usuarioService.presentToast('Todas las notificaciones han sido marcadas como leídas');
    this.modalCtrl.dismiss();
    console.log('Usuario Notificaciones ', this.usuario);
    /* if (this.usuario.Tipo !== 'TRABAJADOR') {
      this.navController.navigateRoot('/tab-inicio');

    } else {
      this.navController.navigateRoot('/tab-inicio');
    } */
    this.navController.navigateRoot('/tab-inicio');

    this.notificacionesService.marcarNotificacionesTodasLeidas();
  }

  abrirNotificacion(idNotificacion: number, ruta: string, tipoDocumento: string, not: Notificacion) {
    // const rutaAux = ruta.concat(':')
    this.db.marcarNotificacionLeida(idNotificacion).then(() => {
      console.log('Ruta ' + ruta);
      let rutaMensaje = '';
      if (tipoDocumento.toUpperCase() === 'MENSAJE') {
        rutaMensaje = ruta + idNotificacion.toString();
      } else {
        rutaMensaje = ruta;
      }
      if (tipoDocumento.toUpperCase() === 'MANTOUX') {

        this.notificacionesService.guardarNotMantoux(not);

      }
      console.log('rutaMensaje ' + rutaMensaje);
      this.navController.navigateForward(rutaMensaje);
      this.modalCtrl.dismiss();
      this.notificacionesService.marcarNotificacionesLeidas();
    }).catch( error => {

      this.modalCtrl.dismiss();

    } );


  }

  closeModal() {

    this.modalCtrl.dismiss();

  }


}
