import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Incidencia } from 'src/app/interfaces/incidencia-interfaces';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UsuarioLoginApi, Notificacion } from '../../../interfaces/usuario-interfaces';
import { IncidenciasService } from '../../../services/incidencias.service';
import { DatabaseService } from '../../../services/database.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-contacto-mpe',
  templateUrl: './contacto-mpe.page.html',
  styleUrls: ['./contacto-mpe.page.scss'],
})
export class ContactoMpePage implements OnInit {

  Nombre = '';
  Email = '';
  Movil = '';
  DNI = '';
  EsGuardiaCivil = false;

  public contactameForm: FormGroup;
  usuario: UsuarioLoginApi;


  constructor(    private formBuilder: FormBuilder,
                  private usuarioService: UsuarioService,
                  private incidenciasService: IncidenciasService,
                  private databaseService: DatabaseService,
                  private navController: NavController
    ) { }

  ngOnInit() {
    this.usuario = this.usuarioService.getUsuario();
    if (this.usuario.NombreCompleto !== undefined && this.usuario.NombreCompleto !== null && this.usuario.NombreCompleto.length > 0) {
      this.Nombre = this.usuario.NombreCompleto;
    } else {
      this.Nombre = '';
    }

    
    this.contactameForm = this.formBuilder.group({

     
      asunto: [null, Validators.compose([
        Validators.required
      ])],
      descripcion: [null, Validators.compose([
        Validators.required
      ])]
    });
    }


  async enviarConsulta() {
    await this.usuarioService.present('Enviando incidencia...');
    const fechaHoy = moment().format();
    await this.incidenciasService.enviarIncidencia(this.usuario.UserName, this.usuario.Password, null, fechaHoy, this.contactameForm.value.descripcion, this.contactameForm.value.asunto,null).then( data => {
      console.log('Repuesta API ADD INCIDENCIA: ', data);

      if(data.Respuesta.toString().toLocaleUpperCase() !== 'OK') {

        const incidencia: Incidencia = {
          UserName: this.usuario.UserName,
          Password: this.usuario.Password,
          Descripcion: this.contactameForm.value.descripcion,
          Titulo: this.contactameForm.value.asunto,
          FechaIncidencia: fechaHoy,
          IdEventoServicio: null,
          IdIncidencia: null,
        };

        const contenido = JSON.stringify(incidencia);
        const url = 'https://intranet-ayto.com/api/Ayto/Incidencia';
        const tipoJsonPendiente = 'INCIDENCIA';

        this.databaseService.addJsonPendiente(url, contenido, tipoJsonPendiente);
      }
      this.usuarioService.dismiss();
      

    }).catch(error => {

      console.log('ERROR, al enviar incidencia, guardamos jsonPendientes');

      const incidencia: Incidencia = {
        UserName: this.usuario.UserName,
        Password: this.usuario.Password,
        Descripcion: this.contactameForm.value.descripcion,
        Titulo: this.contactameForm.value.asunto,
        FechaIncidencia: fechaHoy,
        IdEventoServicio: null,
        IdIncidencia: null,
      };

      const contenido = JSON.stringify(incidencia);
      const url = 'https://intranet-ayto.com/api/Ayto/Incidencia';
      const tipoJsonPendiente = 'INCIDENCIA';

      this.databaseService.addJsonPendiente(url, contenido, tipoJsonPendiente);
      this.usuarioService.dismiss();

    });

    this.usuarioService.presentToast('Incidencia mandada correctamente.');
    this.navController.navigateRoot('tareas-inicio');

  }

}
