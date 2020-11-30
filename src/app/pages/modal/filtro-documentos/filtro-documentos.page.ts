import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { UsuarioService } from '../../../services/usuario.service';
import { Centro, RespuestaGetAPICertificadosAptitud, ObtenerCertificados } from '../../../interfaces/interfaces-grupo-mpe';
import * as moment from 'moment';
import { UsuarioLogin, DatosFiltros, UsuarioLoginApi } from '../../../interfaces/usuario-interfaces';
import { NgxXml2jsonService } from 'ngx-xml2json';
import { DocumentosTrabajadoresService } from '../../../services/documentos-trabajadores.service';


@Component({
  selector: 'app-filtro-documentos',
  templateUrl: './filtro-documentos.page.html',
  styleUrls: ['./filtro-documentos.page.scss'],
})
export class FiltroDocumentosPage implements OnInit {
  organizeby: any;
  proptype: any;
  wantslabel: any;
  centros: Centro[];

  usuario: UsuarioLoginApi;
  listaCertificados = [];
  ultimoMes = false;
  ultimoTrimestre = false;
  anioActual = false;
  anioAnterior = false;


  filtro_dni = '';
/*   filtro_desde = moment('01/01/1900').format('DD/MM/YYYY').toString();
  filtro_hasta = moment().locale('es').format('DD/MM/YYYY').toString(); */
  filtro_desde: Date = null;
  filtro_hasta: Date = null;
  filtro_nombre = '';
  filtro_idCentro: string;
  filtro_idCentroEspecificado = 0;


  public radiusmiles = 1;
  public minmaxprice = {
    upper: 5000000,
    lower: 100000
  };

  constructor(private modalCtrl: ModalController, private usuarioService: UsuarioService,
              private documentosTrabajadoresService: DocumentosTrabajadoresService, private navCtrl: NavController ) { }


  ngOnInit() {
//    this.centros = this.usuarioService.getCentros();
    this.usuario = this.usuarioService.getUsuario();
  }



  closeModal() {

    this.modalCtrl.dismiss();

  }

  filtrar() {
    let fecha_desde_aux: string;
    let fecha_hasta_aux: string;
    let idCentroAUX: number;

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
    if (this.filtro_idCentro === undefined) {

      idCentroAUX = 0;
      this.filtro_idCentroEspecificado = 0;

    } else {
      idCentroAUX = parseInt(this.filtro_idCentro, 10);
      this.filtro_idCentroEspecificado = 1;

    }


    console.log('DESDE', fecha_desde_aux);
    console.log('HASTA', fecha_hasta_aux);
    console.log('NOMBRE', this.filtro_nombre);
    console.log('DNI', this.filtro_dni);
    console.log('IDCENTRO', idCentroAUX);
    console.log('IDCENTROESPECIFICADO', this.filtro_idCentroEspecificado);

/*     this.getCertificados(fecha_desde_aux, fecha_hasta_aux, this.filtro_nombre, this.filtro_dni, idCentroAUX, this.filtro_idCentroEspecificado);
 */
    const datosFil: DatosFiltros = {
      fecha_desde: fecha_desde_aux,
      fecha_hasta: fecha_hasta_aux,
      nombre: this.filtro_nombre,
      dni: this.filtro_dni,
      idCentro: idCentroAUX,
      idCentroEspecificado: this.filtro_idCentroEspecificado
    };

    this.documentosTrabajadoresService.guardarFiltros(datosFil);
    this.closeModal();

  }


  /* getCertificados(fechaDesde: string, fechaHasta: string, nombre: string, dni: string, idCentro: number, idCentroEspecificado: number) {
    try {

      let nifConsultor = '';
      if (this.usuario.Tipo === 'CONSULTOR') {
        nifConsultor = this.usuarioService.empresaConsultor.Nif;
      }
      this.usuarioService.present('Cargando datos...');
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
              '<Usuario>' + this.usuario.Usuario + '</Usuario>' +
              '<Password>' + this.usuario.Password + '</Password>' +
            '</AuthHeader>' +
          '</soap:Header>' +
          '<soap:Body>' +
            '<ObtenerCertificadosAptitudRelacionDocumentos xmlns="http://tempuri.org/">' +
              '<FiltroCerApt>' +
                '<FechaDesde>' + fechaDesde + '</FechaDesde>' +
                '<FechaHasta>' + fechaHasta + '</FechaHasta>' +
                '<NombreTrabajador>' + nombre + '</NombreTrabajador>' +
                '<Dni>' + dni + '</Dni>' +
                '<NifClienteConsultor>' + nifConsultor + '</NifClienteConsultor>' +
                '<IdCentroTrabajo>' + idCentro + '</IdCentroTrabajo>' +
                '<IdCentroTrabajoEspecificado>' + idCentroEspecificado + '</IdCentroTrabajoEspecificado>' +
              '</FiltroCerApt>' +
            '</ObtenerCertificadosAptitudRelacionDocumentos>' +
          '</soap:Body>' +
        '</soap:Envelope>';


      xmlhttp.onreadystatechange =  () => {
          if (xmlhttp.readyState === 4) {
              if (xmlhttp.status === 200) {
                  const xml = xmlhttp.responseXML;
                  const obj: RespuestaGetAPICertificadosAptitud = JSON.parse(JSON.stringify(this.ngxXml2jsonService.xmlToJson(xml)));
                  // tslint:disable-next-line: max-line-length
                  const a: ObtenerCertificados = JSON.parse(JSON.stringify(obj['soap:Envelope']['soap:Body']['ObtenerCertificadosAptitudRelacionDocumentosResponse']['ObtenerCertificadosAptitudRelacionDocumentosResult']));
                  if (a.CertificadoAptitudInfo !== undefined && !Array.isArray(a.CertificadoAptitudInfo)) {

                    this.listaCertificados.push(a.CertificadoAptitudInfo);

                  } else {

                    this.listaCertificados = a.CertificadoAptitudInfo;

                  }
                  console.log('Cert: ', a.CertificadoAptitudInfo);
                  console.log('1.', this.listaCertificados);
                  this.usuarioService.dismiss();
                  this.usuarioService.guardarCertificados(this.listaCertificados);
                  this.closeModal();
              } else {
                this.usuarioService.dismiss();
                this.closeModal();
              }
          } else {
            this.usuarioService.dismiss();
            this.closeModal();
          }
      };
      xmlhttp.send(sr);
    } catch (error) {
      this.usuarioService.dismiss();
      this.closeModal();
    }
  } */

  ultimoMesF() {

    const fechaDesde = moment().add(-1, 'month').format('YYYY-MM-DDT00:00:00');
    this.filtro_desde = new Date(fechaDesde);
    this.filtrar();
  }

  ultimoTrimestreF() {

    const fechaDesde = moment().add(-3, 'month').format('YYYY-MM-DDT00:00:00');
    this.filtro_desde = new Date(fechaDesde);
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
