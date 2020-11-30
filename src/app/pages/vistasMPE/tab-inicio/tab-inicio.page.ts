import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Opciones, UsuarioLogin, UsuarioLoginApi } from '../../../interfaces/usuario-interfaces';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab-inicio',
  templateUrl: './tab-inicio.page.html',
  styleUrls: ['./tab-inicio.page.scss'],
})
export class TabInicioPage implements OnInit {

  usuario: UsuarioLoginApi;
  esGuardiaCivil = false;
  opcionesTab: Opciones[];


  constructor(private usuarioService: UsuarioService,
              private route: ActivatedRoute) {

    this.usuario = this.usuarioService.getUsuario();
    console.log('TAB-INICIO: ', this.usuario);

  }

  ngOnInit() {



  }

}
