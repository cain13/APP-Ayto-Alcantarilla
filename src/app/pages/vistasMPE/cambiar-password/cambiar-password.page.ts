import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { UsuarioService } from '../../../services/usuario.service';
import * as moment from 'moment';
import { CambiarPassword, UsuarioLogin } from '../../../interfaces/usuario-interfaces';
import { NgxXml2jsonService } from 'ngx-xml2json';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CambioPassword } from 'src/app/interfaces/interfaces-grupo-mpe';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.page.html',
  styleUrls: ['./cambiar-password.page.scss'],
})
export class CambiarPasswordPage implements OnInit {
  public onPasswordForm: FormGroup;
  cambiarPassword: CambiarPassword;
  isSmallPhone: boolean;
  controller = document.querySelector('ion-alert-controller');

  constructor(private modalCtrl: ModalController, private usuarioService: UsuarioService,
    private ngxXml2jsonService: NgxXml2jsonService, private navCtrl: NavController,  private formBuilder: FormBuilder,
    private platform: Platform
    ) { }

  ngOnInit() {
    this.cambiarPassword = this.usuarioService.getCambiarPassword();
    this.platform.ready().then(() => {
      console.log('Width: ' + this.platform.width());
      console.log('Height: ' + this.platform.height());
      if (this.platform.width() <= 360) {
        this.isSmallPhone = true;
        console.log('Si es movil pequeño');
      } else {
        this.isSmallPhone = false;
        console.log('No es movil pequeño');

      }
    });
    if (this.cambiarPassword === null || this.cambiarPassword === undefined) {
      this.onPasswordForm = this.formBuilder.group({
        PassOld: [null, Validators.compose([
          Validators.required
        ])],
        PassNew: [null, Validators.compose([
          Validators.required
        ])],
        PassConfirmada: [null, Validators.compose([
          Validators.required
        ])]
      },
      {
        validators: this.passwordIguales('PassOld', 'PassNew', 'PassConfirmada')
      });
    }

  }

  passwordIguales(passold: string, passNew: string, passConfirm: string) {

    return (formGroup: FormGroup) => {
      const passOldControl = formGroup.controls[passold];
      const pass1Control = formGroup.controls[passNew];
      const pass2Control = formGroup.controls[passConfirm];

      if (passOldControl.value === this.usuarioService.usuario.Password) {
        if ( pass1Control.value === pass2Control.value) {

          pass2Control.setErrors(null);

        } else {

          pass2Control.setErrors({noEsIgual: true});

        }
        passOldControl.setErrors(null);
      } else {
        passOldControl.setErrors({noEsIgual: true});
      }



    };
  }
  CambiarPasswordButton() {
   /*  this.usuarioService.present('Actualizando contraseña...');
    console.log('PassOld ' + this.onPasswordForm.get('PassOld').value);
    console.log('PassNew ' + this.onPasswordForm.get('PassNew').value);
    console.log('PassConfirmada ' + this.onPasswordForm.get('PassConfirmada').value);
    const passOld = this.onPasswordForm.get('PassOld').value;
    const passNew = this.onPasswordForm.get('PassNew').value;
    const passConfirm = this.onPasswordForm.get('PassConfirmada').value;
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'https://grupompe.es/MpeNube/ws/DocumentosWS.asmx', true);
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
//    xmlhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
     xmlhttp.responseType = 'document';
      // the following variable contains my xml soap request (that you can get thanks to SoapUI for example)
    const sr =
    '<?xml version="1.0" encoding="utf-8"?>' +
    '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
      '<soap:Header>' +
        '<AuthHeader xmlns="http://tempuri.org/">' +
          '<Usuario>' + this.usuarioService.usuario.Usuario + '</Usuario>' +
          '<Password>' + passOld + '</Password>' +
        '</AuthHeader>' +
      '</soap:Header>' +
      '<soap:Body>' +
        '<CambiarPassword xmlns="http://tempuri.org/">' +
          '<Password>' + passNew + '</Password>' +
          '<ConfirmarPassword>' + passConfirm +  '</ConfirmarPassword>' +
        '</CambiarPassword>' +
      '</soap:Body>' +
    '</soap:Envelope>';
    xmlhttp.onreadystatechange =  () => {
          if (xmlhttp.readyState === 4) {
              if (xmlhttp.status === 200) {
                  const usuarioAux: UsuarioLogin = this.usuarioService.usuario;
                  usuarioAux.Password = passNew;
                  console.log('USUARIO NUEVO: ', usuarioAux);
                  this.usuarioService.actualizarPerfil(usuarioAux);
                  this.usuarioService.dismiss();
                  this.usuarioService.presentToast('Contraseña Cambiada correctamente !!');
              } else {
                this.usuarioService.dismiss();
                this.usuarioService.presentToast('¡ERROR! La contraseña no se a cambiado correctamente');
              }
          } else {
            this.usuarioService.dismiss();
            this.usuarioService.presentToast('¡ERROR! La contraseña no se a cambiado correctamente');
          }
      };
    xmlhttp.send(sr);

    this.closeModal(); */
  }
  closeModal() {
    this.modalCtrl.dismiss();
  }



  processForm(event) {
    event.preventDefault();
    console.log('Click Formulario');
  }

  get passOldNoValido() {
    let passOld: string;
    passOld = this.onPasswordForm.get('PassOld').value;

    return  (passOld !== this.usuarioService.convertPassword(this.usuarioService.usuario.Password.toString()) && this.onPasswordForm.get('PassOld').touched);
  }

  get passNewNoValido() {
    let passNew: string;
    passNew = this.onPasswordForm.get('PassNew').value;
    return this.onPasswordForm.get('PassNew').invalid && this.onPasswordForm.get('PassNew').touched && passNew.length > 0;

  }

  get passConfirNoValido() {
    let passNueva: string;
    passNueva = this.onPasswordForm.get('PassNew').value;
    let passConfir: string;
    passConfir = this.onPasswordForm.get('PassConfirmada').value;

    return (passNueva !== passConfir && this.onPasswordForm.get('PassConfirmada').touched && passConfir.length  > 0) ? true : false;

  }



}
