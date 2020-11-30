import { Component, OnInit } from '@angular/core';
import { PopoverController, NavController } from '@ionic/angular';
import { MessageService } from '../../providers/message/message.service';
import { Validators } from '@angular/forms';
import { Notificaciones, Notificacion } from 'src/app/interfaces/usuario-interfaces';
import { DocumentosTrabajadoresService } from '../../services/documentos-trabajadores.service';
import * as moment from 'moment';
import { NotificacionesMensajes } from '../../interfaces/usuario-interfaces';
import { DatabaseService } from '../../services/database.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  messages: Array<any> = [];

  listaNotificaciones: Array<Notificaciones> = [];
  listaMensajes: Array<Notificacion> = [];
  constructor(
    public messageService: MessageService,
    public popoverController: PopoverController,
    private documentosService: DocumentosTrabajadoresService,
    private usuarioService: UsuarioService,
    private navController: NavController,
    private db: DatabaseService
  ) {

  }

  async ngOnInit() {
    await this.getNotificaciones();
  }
    async getNotificaciones() {
    this.usuarioService.present('Cargando notificaciones...');

    await this.db.obtenerTodasNotificacion().then( async res => {

      console.log('FICHAR: respuestaBD motivos: ', res);
      this.listaMensajes = res;
      if(res.length == 0) {
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

      const Notificacion = {
        IdNotificacion: 1,
        Titulo: 'No tienes notificaciones',
        Icono: 'notifications-off-outline',
        Ruta: '/',
        Mensaje: 'No hay notificaciones nuevas',
        Fecha:  moment().format('YYYY-MM-DDT00:00:00'),
        Leido: 1,
        TipoDocumento: 'Docuemento'
      };
      this.listaMensajes.push(Notificacion);
      return this.listaMensajes;
  }


  getMessages() {
    this.messages = this.messageService.getMessages();
  }

  async close(idNotificacion: number, ruta: string) {
    //const rutaAux = ruta.concat(':')
    await this.db.marcarNotificacionLeida(idNotificacion).then(() => {

      this.navController.navigateForward(ruta);
      this.popoverController.dismiss();

    }).catch( error => {

      this.popoverController.dismiss();

    } );

  }


}
