import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioLoginApi } from '../../../interfaces/usuario-interfaces';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-incidencias',
  templateUrl: './incidencias.page.html',
  styleUrls: ['./incidencias.page.scss'],
})
export class IncidenciasPage implements OnInit {

  public incidenciasForm: FormGroup;
  usuario: UsuarioLoginApi;
  movil: string;
  asunto: string;
  descripcion: string;
  nombre: string;

  constructor(private usuarioService: UsuarioService,
              private formBuilder: FormBuilder,) { }

  ngOnInit() {

    this.usuario = this.usuarioService.getUsuario();
    this.nombre = this.usuario.NombreCompleto;
    this.incidenciasForm = this.formBuilder.group({

      nombre: [this.nombre, Validators.compose([
        Validators.required
      ])],
      asunto: [null, Validators.compose([
        Validators.required
      ])],
      descripcion: [null, Validators.compose([
        Validators.required
      ])]
    });

  }


  enviarConsulta() {

    console.log('Nombre: ', this.nombre);
    console.log('Asunto: ', this.asunto);
    console.log('Descripcion: ', this.descripcion);

  }

}
