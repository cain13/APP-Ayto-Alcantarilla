import { Component, OnInit } from '@angular/core';
import { Tarea } from '../../../interfaces/interfacesTareas';
import { TareasService } from '../../../services/tareas.service';
import { AlertController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { UsuarioService } from '../../../services/usuario.service';
import { UsuarioLoginApi } from '../../../interfaces/usuario-interfaces';



@Component({
  selector: 'app-tarea-mas-info',
  templateUrl: './tarea-mas-info.page.html',
  styleUrls: ['./tarea-mas-info.page.scss'],
})
export class TareaMasInfoPage implements OnInit {

  tarea: Tarea;
  telefono: string;
  usuario: UsuarioLoginApi;
  constructor(private tareaService: TareasService,
              private alertController: AlertController,
              private geolocation: Geolocation,
              private usuarioService: UsuarioService,
              ) { }

  ngOnInit() {

    this.tarea = this.tareaService.getTarea();
    this.telefono = this.tarea.PersonaContacto1;
    this.usuario = this.usuarioService.getUsuario();
    console.log('TAREA: ', this.tarea);
    console.log('Telefono: ', this.telefono);

  }


  async abrirGoogleMaps() {

    const urlDestino: string = 'https://www.google.com/maps/dir/?api=1&destination='+this.tarea.Latitud+','+this.tarea.Longitud+'&travelmode=driving';

    window.open(urlDestino, '_system');


  }

  async addUbicacion() {


    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Introduzca Código.',
      inputs: [
        {
          name: 'name1',
          type: 'text',
          placeholder: 'Código'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            alert.dismiss();
            console.log('Confirm Cancel Inicio');
          }
        }, {
          text: 'Ok',
          handler: async (data) => {
            console.log('Confirm Password Inicio');
            //await this.usuarioService.present('Añadiendo ubicación...');
            this.geolocation.getCurrentPosition().then( async (pos) => {
              /* await this.tareaService.addUbicacionAPI(pos.coords.latitude, pos.coords.longitude, data.name1, this.usuario.IdUsuario).then( async respuesta => {

                if (!respuesta.Ok) {
                  await alert.dismiss();
                  this.usuarioService.dismiss();
                  this.usuarioService.presentAlert('Error', 'No ha sido posible añadir ubicación', 'Intentelo de nuevo más tarde');

                } else {

                  await alert.dismiss();
                  this.usuarioService.dismiss();
                  this.usuarioService.presentAlert('Ubicación añadida correctamente', '', '');
                  console.log('Error GPS: ', respuesta);


                }

              }).catch( error => {

                alert.dismiss();
                this.usuarioService.dismiss();
                this.usuarioService.presentAlert('Error', 'No ha sido posible añadir ubicación', 'Compruebe su conexión a internet.');
                console.log('Error GPS: ', error);

              }) */
        
              console.log(pos);
            }).catch( error => {
              alert.dismiss();
              this.usuarioService.dismiss();
              this.usuarioService.presentAlert('Error', 'No ha sido posible acceder a su ubicación', 'Intentelo de nuevo más tarde');
              console.log('Error GPS: ', error);

            });
            
          }
        }
      ]
    });
    await alert.present();
    
  }

}
