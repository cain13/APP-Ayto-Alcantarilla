import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { UsuarioService } from '../../../services/usuario.service';
import { CambiarPassword, UsuarioLoginApi } from '../../../interfaces/usuario-interfaces';
import { NgxXml2jsonService } from 'ngx-xml2json';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

    this.usuarioService.present('Actualizando contraseña...');
    const passOld = this.onPasswordForm.get('PassOld').value;
    const passNew = this.onPasswordForm.get('PassNew').value;

    this.usuarioService.actualizarPasswordAPI(this.usuarioService.getUsuario().UserName, passOld.toString(), passNew.toString()).then( resp => {
      console.log('respuesta api cambiar: ', resp);

      if (resp.Respuesta.toString().toLocaleUpperCase() === 'OK') {

        const usuarioAux: UsuarioLoginApi = this.usuarioService.usuario;
        usuarioAux.Password = passNew;
        console.log('USUARIO NUEVO: ', usuarioAux);
        this.usuarioService.actualizarPerfil(usuarioAux);
        this.usuarioService.dismiss();
        this.usuarioService.presentToast('Contraseña Cambiada correctamente!!');

      } else {

        this.usuarioService.dismiss();
        this.usuarioService.presentAlert('¡ERROR!', 'Fallo al cambiar la contraseña', 'Compruebe su conexión a internet');
      }

    }).catch( error => {

      this.usuarioService.dismiss();
      this.usuarioService.presentAlert('¡ERROR!', 'Fallo al cambiar la contraseña', 'Compruebe su conexión a internet');

    })
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
