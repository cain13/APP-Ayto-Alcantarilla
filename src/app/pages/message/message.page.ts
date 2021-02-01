import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DatabaseService } from '../../services/database.service';
import { Notificacion, UsuarioLoginApi } from '../../interfaces/usuario-interfaces';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {
  message: Notificacion = {
    IdNotificacion: 0,
    IdNotificacionAPI: 0,
        Titulo:'',
        Leido:1,
        Mensaje:'',
        Fecha: 'new Date()',
        Icono: '',
        Ruta:''
  };

  usuario: UsuarioLoginApi;

  fecha: Date;
 
  messageID: any = this.route.snapshot.paramMap.get('id');

  constructor(
    public route: ActivatedRoute,
    public db: DatabaseService,
    private usuarioService: UsuarioService
  ) { 
    this.usuario = this.usuarioService.getUsuario();
  }

  async ngOnInit() {
    
    console.log("messageID ",this.messageID);
    await this.db.obtenerNotificacion(this.messageID, this.usuario.UserName, this.usuario.Password).then((noti) => {
      this.message = {
        IdNotificacion: noti.IdNotificacion,
        IdNotificacionAPI: noti.IdNotificacionAPI,
        Titulo: noti.Titulo,
        Leido: noti.Leido,
        Mensaje: noti.Mensaje,
        Fecha:  new Date(noti.Fecha).toString(),
        Icono: noti.Icono,
        Ruta: noti.Ruta
      };

      this.fecha = new Date (this.message.Fecha);
    });
  }

}
