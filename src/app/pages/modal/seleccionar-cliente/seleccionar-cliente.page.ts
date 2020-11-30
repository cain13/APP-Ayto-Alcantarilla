import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { UsuarioService } from '../../../services/usuario.service';
import { Centro, RespuestaGetAPICertificadosAptitud, ObtenerCertificados, RespuestaClientes, RespuestaClienteInfo, ObtenerCentros, RespuestaGetCentrosTrabajo } from '../../../interfaces/interfaces-grupo-mpe';
import * as moment from 'moment';
import { UsuarioLogin, EmpresaConsultor } from '../../../interfaces/usuario-interfaces';
import { NgxXml2jsonService } from 'ngx-xml2json';
import categories from '../../../providers/category/mock-categories';


@Component({
  selector: 'app-seleccionar-cliente',
  templateUrl: './seleccionar-cliente.page.html',
  styleUrls: ['./seleccionar-cliente.page.scss'],
})
export class SeleccionarClientePage implements OnInit {

  usuario: UsuarioLogin;
  listaClientes = [];
  listaCentros = [];
  todosClientes = false;

  constructor(private modalCtrl: ModalController, private usuarioService: UsuarioService,
              private ngxXml2jsonService: NgxXml2jsonService, private navCtrl: NavController ) { }


  ngOnInit() {
/*     this.getClientes();
 */  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  /* getClientes() {
    try {
      this.usuario = this.usuarioService.getUsuario();
      this.usuarioService.present('Cargando datos...');
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
              '<Usuario>' + this.usuario.Usuario + '</Usuario>' +
              '<Password>' + this.usuario.Password + '</Password>' +
            '</AuthHeader>' +
          '</soap:Header>' +
          '<soap:Body>' +
            '<ObtenerListadoClientes xmlns="http://tempuri.org/" />' +
          '</soap:Body>' +
        '</soap:Envelope>';


      xmlhttp.onreadystatechange =  () => {
            if (xmlhttp.readyState === 4) {
                if (xmlhttp.status === 200) {
                    const xml = xmlhttp.responseXML;
                    const obj: RespuestaClientes = JSON.parse(JSON.stringify(this.ngxXml2jsonService.xmlToJson(xml)));
                    // tslint:disable-next-line: max-line-length
                    const a: RespuestaClienteInfo = JSON.parse(JSON.stringify(obj['soap:Envelope']['soap:Body']['ObtenerListadoClientesResponse']['ObtenerListadoClientesResult']));
                    if (a.ClienteInfo !== undefined && !Array.isArray(a.ClienteInfo)) {

                      this.listaClientes.push(a.ClienteInfo);

                    } else {

                      this.listaClientes = a.ClienteInfo;

                    }
                    console.log('ClienteInfo: ', a.ClienteInfo);
                    console.log('1.', this.listaClientes);
                    this.usuarioService.dismiss();
                    this.usuarioService.guardarClientes(this.listaClientes);
                } else {
                  this.usuarioService.dismiss();
                }
            } else {
              this.usuarioService.dismiss();
            }
        };
      xmlhttp.send(sr);
    } catch (error) {
      this.usuarioService.dismiss();
    }
  } */

  SeleccionarCliente(nifCliente, NombreCliente) {
    console.log('Cliente Seleccionado ' + NombreCliente + ' NIF ' + nifCliente );
    // tslint:disable-next-line: no-shadowed-variable
    const EmpresaConsultor = {
      Nif: nifCliente,
      NombreCliente: NombreCliente
    };
/*     this.usuarioService.guardarEmpresaConsultor(EmpresaConsultor);
     this.getCentros(nifCliente);
  */  this.closeModal();
    this.usuarioService.dismiss();
    // this.navCtrl.navigateRoot('certificado-aptitud');
  }

  /* getCentros(nif) {
    try {
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
          '<NifClienteConsultor>' + nif + '</NifClienteConsultor>' +
          '</ObtenerCentrosTrabajo>' +
        '</soap:Body>' +
      '</soap:Envelope>';
      console.log('sr ' + sr);
      xmlhttp.onreadystatechange =  () => {
            if (xmlhttp.readyState === 4) {
                if (xmlhttp.status === 200) {
                  const xml = xmlhttp.responseXML;
                  const obj: RespuestaGetCentrosTrabajo = JSON.parse(JSON.stringify(this.ngxXml2jsonService.xmlToJson(xml)));
                  // tslint:disable-next-line: max-line-length
                  const a: ObtenerCentros = JSON.parse(JSON.stringify(obj['soap:Envelope']['soap:Body']['ObtenerCentrosTrabajoResponse']['ObtenerCentrosTrabajoResult']));
                  console.log(a.CentroTrabajoInfo);
                  if (a.CentroTrabajoInfo !== undefined && !Array.isArray(a.CentroTrabajoInfo)) {

                    this.listaCentros.push(a.CentroTrabajoInfo);

                  } else {

                    this.listaCentros = a.CentroTrabajoInfo;

                  }
                  this.usuarioService.guardarCentros(this.listaCentros);
                }
            }
        };

      xmlhttp.send(sr);
    } catch (error) {

    }
  } */

  todosClientesSeleccionar() {
    // tslint:disable-next-line: no-shadowed-variable
    const EmpresaConsultor = {
      Nif: '',
      NombreCliente: 'Todos los clientes'
    };
/*     this.usuarioService.guardarEmpresaConsultor(EmpresaConsultor);
    this.getCentros('');*/
    this.closeModal();
    this.usuarioService.dismiss();
    // this.navCtrl.navigateRoot('certificado-aptitud');
  }
}
