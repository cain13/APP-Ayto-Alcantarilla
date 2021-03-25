import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tarea, TipoIncidencia } from 'src/app/interfaces/interfacesTareas';
import { UsuarioLoginApi } from '../../../interfaces/usuario-interfaces';
import { UsuarioService } from '../../../services/usuario.service';
import { TareasService } from '../../../services/tareas.service';
import { IncidenciasService } from '../../../services/incidencias.service';
import * as moment from 'moment';
import { Incidencia } from 'src/app/interfaces/incidencia-interfaces';
import { DatabaseService } from '../../../services/database.service';
import { Servicio } from '../../../interfaces/servicos-interfaces';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-incidencias',
  templateUrl: './incidencias.page.html',
  styleUrls: ['./incidencias.page.scss'],
})
export class IncidenciasPage implements OnInit {

  public incidenciasForm: FormGroup;
  usuario: UsuarioLoginApi;
  movil: string;
  descripcion: string = '';
  nombre: string;

  tipoIncidenciaSeleccionada: TipoIncidencia;
  listaTiposIncidencias: TipoIncidencia[] = []
  tarea: Servicio;

  constructor(private usuarioService: UsuarioService,
              private formBuilder: FormBuilder,
              private tareasService: TareasService,
              private incidenciasService: IncidenciasService,
              private databaseService: DatabaseService,
              private navController: NavController,
              private menuCtrl: MenuController) { }

  ngOnInit() {
    this.menuCtrl.close();
    this.listaTiposIncidencias = this.tareasService.getListaIncidencias();
    console.log('this.listaTiposIncidencias: ',this.listaTiposIncidencias);
    this.tarea = this.tareasService.getTarea();
    console.log('tarea: ',this.tarea);
    this.listaTiposIncidencias = this.tareasService.getListaIncidencias();
    this.tarea = this.tareasService.getTarea();
    this.usuario = this.usuarioService.getUsuario();
    this.nombre = this.usuario.NombreCompleto;
    this.incidenciasForm = this.formBuilder.group({

      nombre: [this.nombre, Validators.compose([
        Validators.required
      ])],
      tipoIncidencia: [this.tipoIncidenciaSeleccionada, Validators.compose([
        Validators.required
      ])],
      descripcion: [this.descripcion, Validators.compose([
        Validators.required
      ])]
    });

  }


  async enviarConsulta() {

    const userName = this.usuario.UserName;
    const pass = this.usuario.Password;
    const tipoIncidencia = this.tipoIncidenciaSeleccionada.IdIncidenciaAPI;
    const descripcion = this.incidenciasForm.value.descpricion;
    const idTarea = this.tarea.IdEventoServicio;
    const fechaHoy = moment().format();
    console.log('Nombre: ', this.incidenciasForm.value.nombre);
    console.log('TipoIncidencia: ', this.incidenciasForm.value.tipoIncidencia);
    console.log('Descripicon: ', this.incidenciasForm.value.descripcion);
    console.log('idTarea: ', this.tarea.IdEventoServicio);
    await this.usuarioService.present('Enviando Incidencia...');

    await this.incidenciasService.enviarIncidencia(userName, pass,tipoIncidencia, fechaHoy, descripcion, null, idTarea).then( data => {

      if(data.Respuesta.toString().toLocaleUpperCase() !== 'OK') {

        const incidencia: Incidencia = {
          UserName: userName,
          Password: pass,
          Descripcion: descripcion,
          FechaIncidencia: fechaHoy,
          IdEventoServicio: idTarea,
          IdIncidencia: tipoIncidencia,
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
        UserName: userName,
        Password: pass,
        Descripcion: descripcion,
        FechaIncidencia: fechaHoy,
        IdEventoServicio: idTarea,
        IdIncidencia: tipoIncidencia
      };

      const contenido = JSON.stringify(incidencia);
      const url = 'https://intranet-ayto.com/api/Ayto/Incidencia';
      const tipoJsonPendiente = 'INCIDENCIA';

      this.databaseService.addJsonPendiente(url, contenido, tipoJsonPendiente);
      
      this.usuarioService.dismiss();

    })
    this.navController.navigateRoot('tareas-inicio');

  }

}
