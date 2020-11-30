import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioLogin } from 'src/app/interfaces/usuario-interfaces';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UsuarioLoginApi } from '../../../interfaces/usuario-interfaces';

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

    ) { }

  ngOnInit() {
    this.usuario = this.usuarioService.getUsuario();


      if (this.usuario.NombreCompleto !== undefined && this.usuario.NombreCompleto !== null && this.usuario.NombreCompleto.length > 0) {
        this.Email = this.usuario.NombreCompleto;
      } else {
        this.Email = '';
      }
      if (this.usuario.NombreCompleto !== undefined && this.usuario.NombreCompleto !== null && this.usuario.NombreCompleto.length > 0 && this.usuario.NombreCompleto.toString() !== '') {
        this.Movil = this.usuario.NombreCompleto;
      } else {
        this.Movil = '';
      }
      this.contactameForm = this.formBuilder.group({

        movil: [this.Movil, Validators.compose([
          Validators.required
        ])],
        email: [this.Email, Validators.compose([
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
    console.log('NOMBRE: ', this.usuario.UserName);
    console.log('EMAIL: ', this.contactameForm.value.email);
    console.log('ASUNTO: ', this.contactameForm.value.asunto);
    console.log('DESCRIPCION: ', this.contactameForm.value.descripcion);
  }

}
