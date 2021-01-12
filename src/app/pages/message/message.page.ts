import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {
  message = {
    IdNotificacion: 0,
        TipoDocumento: '',
        Titulo:'',
        Leido:1,
        Mensaje:'',
        Fecha: new Date(),
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
        TipoDocumento: noti.TipoDocumento,
        Titulo: noti.Titulo,
        Leido: noti.Leido,
        Mensaje: noti.Mensaje,
        Fecha:  new Date(noti.Fecha),
        Icono: noti.Icono,
        Ruta: noti.Ruta
      };
    });
  }

}
