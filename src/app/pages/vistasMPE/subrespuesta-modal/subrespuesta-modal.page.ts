import { Component, OnInit, Input } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { SubRespuestaInfo, RespuestaSubPreguntaInfo, RespuestaSubPreguntas } from '../../../interfaces/interfaces-grupo-mpe';
import { stringify } from 'querystring';

@Component({
  selector: 'app-subrespuesta-modal',
  templateUrl: './subrespuesta-modal.page.html',
  styleUrls: ['./subrespuesta-modal.page.scss'],
})
export class SubrespuestaModalPage implements OnInit {

  @Input() arraySubRespuestas: string;
  subrespuestas: SubRespuestaInfo;

  respuestasRadioButton: Array<String> = [];


  respuestasSeleccionadas = 'PRUEBA PASA DATOS';

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    const aux: SubRespuestaInfo = JSON.parse(this.arraySubRespuestas);
    this.subrespuestas = aux['SubRespuestaInfo'];

  }

  close() {
    this.modalCtrl.dismiss();
  }

  guardarRespuesta() {

    this.respuestasRadioButton = [];
    for (const res of this.subrespuestas.RespuestaSubPreguntas.RespuestaSubPreguntaInfo) {

      if (res.ValorCheck === true ) {

        this.respuestasRadioButton.push(res.IdRespuesta);

      }

    }

    this.modalCtrl.dismiss({

      'arrayRespuestas': this.respuestasRadioButton

    });

  }

}
