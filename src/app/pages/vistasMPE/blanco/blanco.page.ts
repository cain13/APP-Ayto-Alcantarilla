import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../services/database.service';
import { UsuarioService } from '../../../services/usuario.service';
import { NavController, MenuController, ModalController } from '@ionic/angular';
import {  UsuarioLoginApi } from '../../../interfaces/usuario-interfaces';
import { NgxXml2jsonService } from 'ngx-xml2json';


@Component({
  selector: 'app-blanco',
  templateUrl: './blanco.page.html',
  styleUrls: ['./blanco.page.scss'],
})
export class BlancoPage implements OnInit {

  usuario: UsuarioLoginApi;

  constructor(private databaseService: DatabaseService,
              private usuarioService: UsuarioService,
              private navCtrl: NavController,
              private menuCtrl: MenuController,
              private modalCtrl: ModalController,
              private ngxXml2jsonService: NgxXml2jsonService,

             ) { }

  async ngOnInit() {


    await this.usuarioService.dismiss();
    this.databaseService.estadoBD().then( async () => {

      console.log('BLANCO: Comprobamos si hay ultimo usuario...');
      await this.databaseService.obtenerUltimoUsuario().then( ultimoUsuario => {

        if (ultimoUsuario === null) {
          console.log('No hay usuarios en la BD');
          this.navCtrl.navigateRoot('/walkthrough');

        } else {

          this.usuario = {
            UserName: ultimoUsuario.UserName,
            Password: ultimoUsuario.Password,
            IdEmpleado: ultimoUsuario.IdEmpleado,
            HorasSemanales: ultimoUsuario.HorasSemanales,
            NombreCompleto: ultimoUsuario.NombreCompleto,
            Telefono: ultimoUsuario.Telefono,
            Email: ultimoUsuario.Email
          };

         this.usuarioService.guardarUsuario(this.usuario);
         console.log('Usuario: ', ultimoUsuario);
         this.menuCtrl.enable(true, 'menuTrabajadores');
         this.menuCtrl.enable(false, 'menuCompleto');
         console.log('BLANCO: Si hay usuario en BD: ', this.usuario);
         this.navCtrl.navigateRoot('/tareas-inicio');

         /* if ( this.usuario.Tipo === 'CLIENTE') {
          console.log('ACCEDEMOS COMO CLIENTE');
          this.menuCtrl.enable(false, 'menuTrabajadores');
          this.menuCtrl.enable(true, 'menuCompleto');
          //this.getCentros();
          this.navCtrl.navigateRoot('tab-inicio');

        } else if ( this.usuario.Tipo === 'CONSULTOR') {
          console.log('ACCEDEMOS COMO CONSULTOR');
          this.menuCtrl.enable(false, 'menuTrabajadores');
          this.menuCtrl.enable(true, 'menuCompleto');
          this.searchFilter();
        } else {
          if (this.usuario.EsGuardiaCivil.toString() === 'true') {

            console.log('ACCEDEMOS COMO GUARDIA CIVIL');
            this.menuCtrl.enable(false, 'menuTrabajadores');
            this.menuCtrl.enable(true, 'menuGuardiaCivil');
            this.menuCtrl.enable(false, 'menuCompleto');
            this.navCtrl.navigateRoot('tab-inicio');

          } else {

            console.log('ACCEDEMOS COMO TRABAJADOR');
            this.menuCtrl.enable(true, 'menuTrabajadores');
            this.menuCtrl.enable(false, 'menuGuardiaCivil');
            this.menuCtrl.enable(false, 'menuCompleto');
            this.navCtrl.navigateRoot('tab-inicio');

          }
        } */

         /* this.navCtrl.navigateRoot('/login'); */
        }
      });

      });

    }





  }

