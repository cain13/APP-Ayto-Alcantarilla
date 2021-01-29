import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { UsuarioLoginApi } from '../../../interfaces/usuario-interfaces';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {

  private usuario: UsuarioLoginApi;
  private url = 'https://intranet-ayto.com/api/Ayto/LoginAgenda/?';
  private urlCompleta: string;
  private userName: string;
  private password: string;
  urlCompletaDOM: SafeResourceUrl;
  constructor(private usuarioService: UsuarioService,
              private domSatizer: DomSanitizer) { }

  ngOnInit() {

    this.usuarioService.present('Cargando Calendario...');
    this.usuario = this.usuarioService.getUsuario();
    this.userName = this.usuario.UserName;
    this.password = this.usuario.Password 
    this.urlCompleta = this.url.concat('dni='.concat(this.userName.concat('&'.concat('password='.concat(this.password)))));
    this.urlCompletaDOM = this.domSatizer.bypassSecurityTrustResourceUrl(this.urlCompleta);
    console.log(this.urlCompleta);
    this.usuarioService.dismiss();
    
  }

}
