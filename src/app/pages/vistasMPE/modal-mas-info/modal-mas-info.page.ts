import { Component, OnInit } from '@angular/core';
import { CertificadosService } from '../../../services/certificados.service';
import { Certificado } from 'src/app/interfaces/interfaces-grupo-mpe';
import { PopoverController } from '@ionic/angular';
import * as moment from 'moment';


@Component({
  selector: 'app-modal-mas-info',
  templateUrl: './modal-mas-info.page.html',
  styleUrls: ['./modal-mas-info.page.scss'],
})
export class ModalMasInfoPage implements OnInit {

  certificado: Certificado;
  nombre: string;
  dni: string;
  fecha: string;
  centroTrabajo: string;
  domicilio: string;
  tipoCentro: string;

  constructor(private certificadosService: CertificadosService,
              private popoverController: PopoverController
    ) { }

  ngOnInit() {

    this.certificado = this.certificadosService.getCertificadoInfo();
    console.log(this.certificado);
    this.dni = this.certificado.Descripcion.trim().replace(/\s+/g, '').slice(5, 14);
    this.nombre = this.certificado.Descripcion.split(this.dni.trim())[1].trim();
    this.fecha = moment(this.certificado.FechaDocumento.trim()).format('DD/MM/YYYY');
    this.domicilio = this.certificado.DomicilioCentroTrabajo.trim();
    this.centroTrabajo = this.certificado.CentroTrabajo.split(this.domicilio)[0].slice(4, -1);
    this.domicilio = this.certificado.DomicilioCentroTrabajo;
    this.tipoCentro = this.certificado.TipoCentroTrabajo;

    console.log('DNI: ', this.dni);
    console.log('NOMBRE: ', this.nombre);
    console.log('FECHA: ', this.fecha);
    console.log('CENTRO: ', this.centroTrabajo);
    console.log('DOMICILIO: ', this.domicilio);
    console.log('TIPO CENTRO: ', this.tipoCentro);


  }

  close() {
    this.popoverController.dismiss();
  }


}
