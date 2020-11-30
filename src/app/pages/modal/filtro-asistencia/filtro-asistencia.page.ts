import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { UsuarioService } from '../../../services/usuario.service';
import { Centro, RespuestaGetAPICertificadosAptitud, ObtenerCertificados, RespuestaHistorial, ObtenerHistoriaDocumentos, RespuestaAsistencia, RespuestaAsistenciaInfo } from '../../../interfaces/interfaces-grupo-mpe';
import * as moment from 'moment';
import { UsuarioLogin, DatosFiltros, UsuarioLoginApi } from '../../../interfaces/usuario-interfaces';
import { NgxXml2jsonService } from 'ngx-xml2json';
import { AsistenciaService } from 'src/app/services/asistencia.service';

@Component({
  selector: 'app-filtro-asistencia',
  templateUrl: './filtro-asistencia.page.html',
  styleUrls: ['./filtro-asistencia.page.scss'],
})
export class FiltroAsistenciaPage implements OnInit {

  organizeby: any;
  proptype: any;
  wantslabel: any;
  centros: Centro[];

  usuario: UsuarioLoginApi;
  listaAsistencias = [];
  ultimoMes = false;
  ultimoTrimestre = false;
  anioActual = false;
  anioAnterior = false;


  filtro_dni = '';
  filtro_desde: Date = null;
  filtro_hasta: Date = null;
  filtro_nombre = '';
  filtro_noPresentado: boolean;


  constructor(private modalCtrl: ModalController, private usuarioService: UsuarioService,
              private ngxXml2jsonService: NgxXml2jsonService, private navCtrl: NavController,
              private asistenciaService: AsistenciaService ) { }


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


    if (this.filtro_desde === null) {

      fecha_desde_aux = '1900-01-01T00:00:00';
    } else {

      fecha_desde_aux = moment(this.filtro_desde.toString()).format('YYYY-MM-DDT00:00:00');

    }

    if (this.filtro_hasta === null) {

      fecha_hasta_aux = moment().format('YYYY-MM-DDT00:00:00');
    } else {

      fecha_hasta_aux = moment(this.filtro_hasta.toString()).add(8, 'days').format('YYYY-MM-DDT00:00:00');

    }
    if (this.filtro_noPresentado === undefined) {

      this.filtro_noPresentado = false;

    }


    console.log('DESDE', fecha_desde_aux);
    console.log('HASTA', fecha_hasta_aux);
    console.log('NOMBRE', this.filtro_nombre);
    console.log('DNI', this.filtro_dni);
    console.log('filtro_noPresentado ', this.filtro_noPresentado);

    const filtros: DatosFiltros = {
      fecha_desde: fecha_desde_aux,
      fecha_hasta: fecha_hasta_aux,
      nombre: this.filtro_nombre,
      dni: this.filtro_dni,
      noPresentado: this.filtro_noPresentado,
    };
    console.log('FILTROS: ', filtros);
    this.asistenciaService.guardarFiltrosAsistencias(filtros);
    this.closeModal();

  }

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
