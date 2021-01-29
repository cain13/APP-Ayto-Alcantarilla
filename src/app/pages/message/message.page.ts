import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DatabaseService } from '../../services/database.service';
import { Notificacion } from '../../interfaces/usuario-interfaces';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {
  message: Notificacion = {
    IdNotificacion: 0,
        Titulo:'',
        Leido:1,
        Mensaje:'',
        Fecha: 'new Date()',
        Icono: '',
        Ruta:''
  };
 
  messageID: any = this.route.snapshot.paramMap.get('id');

  constructor(
    public route: ActivatedRoute,
    public db: DatabaseService
  ) { }

  async ngOnInit() {

    console.log("messageID ",this.messageID);
    await this.db.obtenerNotificacion(this.messageID).then((noti) => {
      this.message = {
        IdNotificacion: noti.IdNotificacion,
        Titulo: noti.Titulo,
        Leido: noti.Leido,
        Mensaje: noti.Mensaje,
        Fecha:  new Date(noti.Fecha).toString(),
        Icono: noti.Icono,
        Ruta: noti.Ruta
      };
    });
  }

}
