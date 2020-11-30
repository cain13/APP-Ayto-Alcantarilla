import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../services/database.service';
import { UsuarioService } from '../../../services/usuario.service';
import { NavController, MenuController, ModalController } from '@ionic/angular';
import { UsuarioLogin, UsuarioLoginApi } from '../../../interfaces/usuario-interfaces';
import { RespuestaGetCentrosTrabajo, ObtenerCentros } from 'src/app/interfaces/interfaces-grupo-mpe';
import { SeleccionarClientePage } from '../../modal/seleccionar-cliente/seleccionar-cliente.page';
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
            NombreCompleto: ultimoUsuario.NombreCompleto,
            RememberMe: ultimoUsuario.RememberMe,
            FingerID: ultimoUsuario.FingerID
          };

         this.usuarioService.guardarUsuario(this.usuario);
         console.log('Usuario: ', ultimoUsuario);
         this.menuCtrl.enable(false, 'menuTrabajadores');
         this.menuCtrl.enable(true, 'menuCompleto');
         console.log('BLANCO: Si hay usuario en BD: ', this.usuario);
         this.navCtrl.navigateRoot('/tab-inicio');

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


    /* getCentros() {
      const xmlhttp = new XMLHttpRequest();


      xmlhttp.open('POST', 'https://grupompe.es/MpeNube/ws/DocumentosWS.asmx', true);
      xmlhttp.setRequestHeader('Content-Type', 'text/xml');
//       xmlhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
       xmlhttp.responseType = 'document';
        // the following variable contains my xml soap request (that you can get thanks to SoapUI for example)
      const sr =
      '<?xml version="1.0" encoding="utf-8"?>' +
      '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
        '<soap:Header>' +
          '<AuthHeader xmlns="http://tempuri.org/">' +
            '<Usuario>' + this.usuarioService.usuario.Usuario + '</Usuario>' +
            '<Password>' + this.usuarioService.usuario.Password + '</Password>' +
          '</AuthHeader>' +
        '</soap:Header>' +
        '<soap:Body>' +
          '<ObtenerCentrosTrabajo xmlns="http://tempuri.org/">' +
          '<NifClienteConsultor></NifClienteConsultor>' +
          '</ObtenerCentrosTrabajo>' +
        '</soap:Body>' +
      '</soap:Envelope>';

      xmlhttp.onreadystatechange =  () => {
            if (xmlhttp.readyState === 4) {
                if (xmlhttp.status === 200) {
                  const xml = xmlhttp.responseXML;
                  const obj: RespuestaGetCentrosTrabajo = JSON.parse(JSON.stringify(this.ngxXml2jsonService.xmlToJson(xml)));
                  // tslint:disable-next-line: max-line-length
                  const a: ObtenerCentros = JSON.parse(JSON.stringify(obj['soap:Envelope']['soap:Body']['ObtenerCentrosTrabajoResponse']['ObtenerCentrosTrabajoResult']));
                  console.log(a.CentroTrabajoInfo);
                  this.usuarioService.guardarCentros(a.CentroTrabajoInfo);
                }
            }
        };

      xmlhttp.send(sr);
    } */

    async searchFilter () {
      const modal = await this.modalCtrl.create({
        component: SeleccionarClientePage
      });
      modal.onDidDismiss().then(() => {
        this.navCtrl.navigateRoot('tab-inicio');
      });
      return await modal.present();
    }


  }

