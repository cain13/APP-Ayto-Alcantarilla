import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioAPI, UsuarioLoginApi } from '../../interfaces/usuario-interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { UbicacionesService } from '../../services/ubicaciones.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { TareasService } from '../../services/tareas.service';
import { IonList } from '@ionic/angular';

@Component({
  selector: 'app-ubicaciones',
  templateUrl: './ubicaciones.page.html',
  styleUrls: ['./ubicaciones.page.scss'],
})
export class UbicacionesPage implements OnInit {
  
  @ViewChild('lista', {static: false}) lista: IonList;
  usuario: UsuarioLoginApi
  arrayUsuarios: UsuarioAPI[];
  searchKey = '';

  constructor(private usuarioService: UsuarioService,
              private ubicacionesService: UbicacionesService,
              private geolocation: Geolocation,
              private tareaService: TareasService) { }

  async ngOnInit() {
    await this.usuarioService.present('Cargando usuarios...');
    this.usuario = this.usuarioService.getUsuario();
    console.log('USUARIO UBI: ', this.usuario);

    await this.ubicacionesService.getUsuariosAPI(this.usuario.UserName, this.usuario.Password).then( resp => {

      if ( resp.Respuesta.toUpperCase() === 'OK' ) {

        this.arrayUsuarios = resp.Usuarios;
        this.ubicacionesService.guardarArrayUsuarios(this.arrayUsuarios);
        console.log('this.arrayUsuarios: ', this.arrayUsuarios);
        this.usuarioService.dismiss();
      

      } else {

        this.arrayUsuarios = null;
        this.usuarioService.dismiss();
        console.log('this.mensaje: ', resp);
        this.usuarioService.presentAlert('Error', 'Fallo al cargar los usuarios','Intentelo de nuevo más tarde');

      }

    }).catch( error => {
      console.log('error: ', error);
      this.usuarioService.dismiss();
      this.usuarioService.presentAlert('Error', 'Compruebe su conexión a internet','');

    });

  }

  async addUbicacion(usuarioC: UsuarioAPI) {

    if (this.usuario.TomarLocalizacion !== null && this.usuario.TomarLocalizacion !== undefined && this.usuario.TomarLocalizacion === true) {
  
      await this.usuarioService.present('Añadiendo ubicación...');
      this.geolocation.getCurrentPosition().then( async (pos) => {
        await this.tareaService.addUbicacionAPI(this.usuario.UserName, this.usuario.Password, pos.coords.latitude, pos.coords.longitude,  usuarioC.IdUsuario).then( async resp => {

          if (resp.Respuesta.toUpperCase() !== 'OK') {
            this.lista.closeSlidingItems();
            this.usuarioService.dismiss();
            this.usuarioService.presentAlert('Error', 'No ha sido posible añadir ubicación', 'Intentelo de nuevo más tarde');
            console.log('Error GPS: ', resp);
          } else {
            this.lista.closeSlidingItems();
            this.usuarioService.dismiss();
            this.usuarioService.presentAlert('¡Perfecto!', 'Ubicación añadida correctamente', '');
          }
  
        }).catch( error => {
          this.lista.closeSlidingItems();
          this.usuarioService.dismiss();
          this.usuarioService.presentAlert('Error', 'No ha sido posible añadir ubicación', 'Compruebe su conexión a internet.');
          console.log('Error GPS: ', error);

        });
      }).catch( error => {
        this.lista.closeSlidingItems();
        this.usuarioService.dismiss();
        this.usuarioService.presentAlert('Error', 'No ha sido posible acceder a su ubicación', 'Revise los permisos de localización.');
        console.log('Error GPS: ', error);

      });
      
    } else {
      this.lista.closeSlidingItems();
      this.usuarioService.presentAlert('Error', 'No tiene permisos para añadir una nueva ubicación', '');

    }
  }

  async doRefresh(event) {

    await this.ubicacionesService.getUsuariosAPI(this.usuario.UserName, this.usuario.Password).then( resp => {

      if ( resp.Respuesta.toUpperCase() === 'OK' ) {

        this.arrayUsuarios = resp.Usuarios;
        this.ubicacionesService.guardarArrayUsuarios(this.arrayUsuarios);
        console.log('this.arrayUsuarios: ', this.arrayUsuarios);
        this.usuarioService.dismiss();
      

      } else {

        this.arrayUsuarios = null;
        this.usuarioService.dismiss();
        console.log('this.mensaje: ', resp);
        this.usuarioService.presentAlert('Error', 'Fallo al cargar los usuarios','Intentelo de nuevo más tarde');

      }

    }).catch( error => {
      console.log('error: ', error);
      this.usuarioService.dismiss();
      this.usuarioService.presentAlert('Error', 'Compruebe su conexión a internet','');

    })

    this.searchKey = '';
    event.target.complete();

  }

  async actualizar() {
    await this.usuarioService.present('Cargando datos...');
    await this.ubicacionesService.getUsuariosAPI(this.usuario.UserName, this.usuario.Password).then( resp => {

      if ( resp.Respuesta.toUpperCase() === 'OK' ) {

        this.arrayUsuarios = resp.Usuarios;
        this.ubicacionesService.guardarArrayUsuarios(this.arrayUsuarios);
        console.log('this.arrayUsuarios: ', this.arrayUsuarios);
        this.usuarioService.dismiss();
      

      } else {

        this.arrayUsuarios = null;
        this.usuarioService.dismiss();
        console.log('this.mensaje: ', resp);
        this.usuarioService.presentAlert('Error', 'Fallo al cargar los usuarios','Intentelo de nuevo más tarde');

      }

    }).catch( error => {
      console.log('error: ', error);
      this.usuarioService.dismiss();
      this.usuarioService.presentAlert('Error', 'Compruebe su conexión a internet','');

    });

  }

  onInput(event) {
    console.log(event.target.value);
    this.ubicacionesService.findByName(event.target.value)
        .then(data => {
            this.arrayUsuarios = data;
        })
        .catch(error => alert(JSON.stringify(error)));
  }


  onCancel(event) {
    this.findAll();
  }

  findAll() {
    this.arrayUsuarios = this.ubicacionesService.getArrayUsuarios();

  }

}
