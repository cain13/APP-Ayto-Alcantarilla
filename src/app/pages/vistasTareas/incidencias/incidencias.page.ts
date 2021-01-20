import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoIncidencia } from 'src/app/interfaces/interfacesTareas';
import { UsuarioLoginApi } from '../../../interfaces/usuario-interfaces';
import { UsuarioService } from '../../../services/usuario.service';
import { TareasService } from '../../../services/tareas.service';

@Component({
  selector: 'app-incidencias',
  templateUrl: './incidencias.page.html',
  styleUrls: ['./incidencias.page.scss'],
})
export class IncidenciasPage implements OnInit {

  public incidenciasForm: FormGroup;
  usuario: UsuarioLoginApi;
  movil: string;
  asunto: string = '';
  descripcion: string = '';
  nombre: string;

  tipoIncidenciaSeleccionada: number = 0;
  listaTiposIncidencias: TipoIncidencia[] = []

  constructor(private usuarioService: UsuarioService,
              private formBuilder: FormBuilder,
              private tareasService: TareasService) { }

  ngOnInit() {
    this.listaTiposIncidencias = this.tareasService.getListaIncidencias();
    this.usuario = this.usuarioService.getUsuario();
    this.nombre = this.usuario.NombreCompleto;
    this.incidenciasForm = this.formBuilder.group({

      nombre: [this.nombre, Validators.compose([
        Validators.required
      ])],
      tipoIncidencia: [this.tipoIncidenciaSeleccionada, Validators.compose([
        Validators.required
      ])],
      asunto: [this.asunto, Validators.compose([
        Validators.required
      ])],
      descripcion: [this.descripcion, Validators.compose([
        Validators.required
      ])]
    });

  }


  enviarConsulta() {

    console.log('Nombre: ', this.incidenciasForm.value.nombre);
    console.log('Asunto: ', this.incidenciasForm.value.asunto);
    console.log('TipoIncidencia: ', this.incidenciasForm.value.tipoIncidencia);
    console.log('TipoIncidencia: ', this.incidenciasForm.value.descripcion);


  }

}
