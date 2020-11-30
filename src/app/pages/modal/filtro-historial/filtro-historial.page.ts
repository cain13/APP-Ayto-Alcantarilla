import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { UsuarioService } from '../../../services/usuario.service';
import { Centro, RespuestaGetAPICertificadosAptitud, ObtenerCertificados, RespuestaHistorial, ObtenerHistoriaDocumentos } from '../../../interfaces/interfaces-grupo-mpe';
import * as moment from 'moment';
import { UsuarioLogin, DatosFiltros, UsuarioLoginApi } from '../../../interfaces/usuario-interfaces';
import { NgxXml2jsonService } from 'ngx-xml2json';
import { HitorialNotificacionesService } from '../../../services/hitorial-notificaciones.service';

@Component({
  selector: 'app-filtro-historial',
  templateUrl: './filtro-historial.page.html',
  styleUrls: ['./filtro-historial.page.scss'],
})
export class FiltroHistorialPage implements OnInit {
  usuario: UsuarioLoginApi;
  listaDocumentos = [];
  ultimoMes = false;
  anioActual = false;
  anioAnterior = false;


  filtro_desde: Date = null;
  filtro_hasta: Date = null;


  constructor(private modalCtrl: ModalController, private usuarioService: UsuarioService,
              private ngxXml2jsonService: NgxXml2jsonService, private navCtrl: NavController, private historialNotService: HitorialNotificacionesService ) { }


  ngOnInit() {
    this.usuario = this.usuarioService.getUsuario();

  }



  closeModal() {

    this.modalCtrl.dismiss();

  }

  filtrar() {
    let fecha_desde_aux: string;
    let fecha_hasta_aux: string;

    if (this.filtro_desde === null) {

     fecha_desde_aux = '1900-01-01T00:00:00';
    } else {

      fecha_desde_aux = moment(this.filtro_desde.toString()).format('YYYY-MM-DDT00:00:00');

    }

    if (this.filtro_hasta === null) {

      fecha_hasta_aux = moment().format('YYYY-MM-DDT00:00:00');
    } else {

      fecha_hasta_aux = moment(this.filtro_hasta.toString()).add(1, 'days').format('YYYY-MM-DDT00:00:00');

    }



    console.log('DESDE', fecha_desde_aux);
    console.log('HASTA', fecha_hasta_aux);

    const datos: DatosFiltros = {
      fecha_desde: fecha_desde_aux,
      fecha_hasta: fecha_hasta_aux
    };

    this.historialNotService.guardarFiltros(datos);
    this.closeModal();
/*     this.getNotificaciones(fecha_desde_aux, fecha_hasta_aux);
 */
  }


  /* getNotificaciones(fechaDesde: string, fechaHasta: string) {
    try {

      let nifConsultor = '';
      if (this.usuario.Tipo === 'CONSULTOR') {
        nifConsultor = this.usuarioService.empresaConsultor.Nif;
      }

      this.usuarioService.present('Cargando...');
      const fecha_desde = '1900-01-01T00:00:00';
      const fecha_hasta = moment().format('YYYY-MM-DDT00:00:00');
      const xmlhttp = new XMLHttpRequest();
      xmlhttp.open('POST', 'https://grupompe.es/MpeNube/ws/DocumentosWS.asmx', true);
      xmlhttp.setRequestHeader('Content-Type', 'text/xml');
      xmlhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
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
          '<ObtenerHistoricoNotificacionesRelacionDocumentos xmlns="http://tempuri.org/">' +
            '<FiltroNot>' +
              '<FechaDesde>' + fechaDesde + '</FechaDesde>' +
              '<FechaHasta>' + fechaHasta + '</FechaHasta>' +
              '<NifClienteConsultor>' + nifConsultor + '</NifClienteConsultor>' +
            '</FiltroNot>' +
          '</ObtenerHistoricoNotificacionesRelacionDocumentos>' +
        '</soap:Body>' +
      '</soap:Envelope>';

      xmlhttp.onreadystatechange =  () => {
            if (xmlhttp.readyState === 4) {
                if (xmlhttp.status === 200) {
                    const xml = xmlhttp.responseXML;
                    const obj: RespuestaHistorial = JSON.parse(JSON.stringify(this.ngxXml2jsonService.xmlToJson(xml)));
                    // tslint:disable-next-line: max-line-length
                    const a: ObtenerHistoriaDocumentos = JSON.parse(JSON.stringify(obj['soap:Envelope']['soap:Body']['ObtenerHistoricoNotificacionesRelacionDocumentosResponse']['ObtenerHistoricoNotificacionesRelacionDocumentosResult']));
                    console.log(a);
                    if (a.HistoricoNotificacionInfo !== undefined && !Array.isArray(a.HistoricoNotificacionInfo)) {

                      this.listaDocumentos.push(a.HistoricoNotificacionInfo);

                    } else {

                      this.listaDocumentos = a.HistoricoNotificacionInfo;

                    }

                    this.usuarioService.guardarNotificaciones(this.listaDocumentos);
                }
            }
        };
      xmlhttp.send(sr);
      this.closeModal();
      this.usuarioService.dismiss();
    } catch (error) {
      this.usuarioService.dismiss();
    }

  } */

  Todos() {

    const fechaDesde = '1900-01-01T00:00:00';
    const fechaHasta = '1900-01-01T00:00:00';
    this.filtro_desde = new Date(fechaDesde);
    this.filtro_hasta = new Date(moment().format('YYYY-MM-DDT00:00:00'));
    this.filtrar();
  }

  anioAnteriorF() {
    const anio = moment().year() - 1 ;
    const desdeAux = anio + '/01/01';
    const hastaAux = anio + '/12/31';
    this.filtro_desde = new Date(desdeAux);
    this.filtro_hasta = new Date(hastaAux);
    this.filtrar();

  }

  anioActualF() {

    const anio = moment().year();
    const desdeAux = anio + '/01/01';
    const hastaAux = anio + '/12/31';
    this.filtro_desde = new Date(desdeAux);
    this.filtro_hasta = new Date(hastaAux);
    this.filtrar();


  }
}
