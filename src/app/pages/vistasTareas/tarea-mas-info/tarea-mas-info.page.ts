import { Component, OnInit } from '@angular/core';
import { Tarea } from '../../../interfaces/interfacesTareas';
import { TareasService } from '../../../services/tareas.service';
import { AlertController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { UsuarioService } from '../../../services/usuario.service';
import { UsuarioLoginApi } from '../../../interfaces/usuario-interfaces';
import { Servicio } from 'src/app/interfaces/servicos-interfaces';
import * as moment from 'moment';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';



@Component({
  selector: 'app-tarea-mas-info',
  templateUrl: './tarea-mas-info.page.html',
  styleUrls: ['./tarea-mas-info.page.scss'],
})
export class TareaMasInfoPage implements OnInit {

  tarea: Servicio;
  telefono: string;
  usuario: UsuarioLoginApi;
  constructor(private tareaService: TareasService,
              private alertController: AlertController,
              private geolocation: Geolocation,
              private usuarioService: UsuarioService,
              private iab: InAppBrowser
              ) { }

  ngOnInit() {

    this.tarea = this.tareaService.getTarea();
    this.telefono = this.tarea.Usuario.Telefono1;
    this.usuario = this.usuarioService.getUsuario();

  }


  async abrirGoogleMaps() {

    const urlDestino: string = 'https://www.google.com/maps/dir/?api=1&destination='+this.tarea.Usuario.Latitud+','+this.tarea.Usuario.Longitud+'&travelmode=driving';

    this.iab.create(urlDestino, '_system');


  }

  async addUbicacion() {

    if (this.usuario.TomarLocalizacion !== null && this.usuario.TomarLocalizacion !== undefined && this.usuario.TomarLocalizacion.toString().toUpperCase() === 'TRUE') {
  
      await this.usuarioService.present('Añadiendo ubicación...');
      this.geolocation.getCurrentPosition().then( async (pos) => {
        console.log('UBICACION:', pos);
        await this.tareaService.addUbicacionAPI(this.usuario.UserName, this.usuario.Password, pos.coords.latitude, pos.coords.longitude,  this.tarea.IdUsuario).then( async resp => {

          if (resp.Respuesta.toUpperCase() !== 'OK') {
            this.usuarioService.dismiss();
            this.usuarioService.presentAlert('Error', 'No ha sido posible añadir ubicación', 'Intentelo de nuevo más tarde');
            console.log('Error GPS: ', resp);
          } else {

            this.usuarioService.dismiss();
            this.usuarioService.presentAlert('Ubicación añadida correctamente', '', '');
          }
  
        }).catch( error => {

          this.usuarioService.dismiss();
          this.usuarioService.presentAlert('Error', 'No ha sido posible añadir ubicación', 'Compruebe su conexión a internet.');
          console.log('Error GPS: ', error);

        });
      }).catch( error => {

        this.usuarioService.dismiss();
        this.usuarioService.presentAlert('Error', 'No ha sido posible acceder a su ubicación', 'Revise los permisos de localización.');
        console.log('Error GPS: ', error);

      });
      
    } else {

      this.usuarioService.presentAlert('Error', 'No tiene permisos para añadir una nueva ubicación', '');

    }
  }

  devolverHora(fecha: string) {

    return moment(fecha).locale('es').format('HH:mm');

  }

}
