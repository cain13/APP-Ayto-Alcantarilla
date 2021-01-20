import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController, LoadingController, IonCheckbox, Platform, ModalController } from '@ionic/angular';
import { TranslateProvider } from '../../providers';
import { NgxXml2jsonService } from 'ngx-xml2json';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UsuarioLoginApi } from 'src/app/interfaces/usuario-interfaces';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';

import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { ModalTerminosPage } from '../vistasMPE/modal-terminos/modal-terminos.page';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public onLoginForm: FormGroup;
  soportaFingerID: boolean;
  @ViewChild('botonHuella', {static: false}) botonHuella: IonCheckbox;
  @ViewChild('botonRecordarme', {static: false}) botonRecordarme: IonCheckbox;
  @ViewChild('botonTerminos', {static: false}) botonTerminos: IonCheckbox;
  @ViewChild('botonMostarContra', {static: false}) botonMostarContra: IonCheckbox;

  checkFinger = false;
  checkRemember = true;
  checkTermino = true;
  usuario: UsuarioLoginApi;
  recordarme = true;
  terminos = false;
  loginFinger: boolean;
  tokenAPI: string;
  mostrarContra = false;
  passwordIcon = 'eye-outline';
  passwordIcon2 = 'eye-off-outline';
  plataforma: string;
  EsGuardiaCivil = false;
  mostrarTerminosModal = false;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private translate: TranslateProvider,
    private formBuilder: FormBuilder,
    private ngxXml2jsonService: NgxXml2jsonService,
    private faio: FingerprintAIO,
    private usuarioService: UsuarioService,
    public modalCtrl: ModalController,
    private fcm: FCM,
    private platform: Platform

  ) {}


  ngOnInit() {

    this.fcm.getToken().then(token => {
      console.log('TOKEN: ', token);
      this.tokenAPI = token;
    });

    this.usuario = this.usuarioService.getUsuario();

    if (this.usuario === null || this.usuario === undefined) {
      this.onLoginForm = this.formBuilder.group({
        usuario: [null, Validators.compose([
          Validators.required
        ])],
        password: [null, Validators.compose([
          Validators.required
        ])]
      });

    } else {
        this.onLoginForm = this.formBuilder.group({
          usuario: [null, Validators.compose([
            Validators.required
          ])],
          password: [null, Validators.compose([
            Validators.required
          ])]
        });
      }

      /* if (this.usuario.RememberMe.toString() === 'true' || this.usuario.RememberMe == null) {

        this.recordarme = true;

      } else {
        this.recordarme = false;
      }

      if (this.usuario.FingerID.toString() === 'true' || this.usuario.RememberMe == null) {

        this.loginFinger = true;

      } else {
        this.loginFinger = false;
      } */

  }



  /* async ionViewWillEnter() {

    this.menuCtrl.enable(false);
    this.usuarioService.setLogin(true);
    console.log('USUARIO: ', this.usuario);
    if (this.usuario !== undefined && this.usuario.FingerID.toString() === 'true') {
      await this.usuarioService.present('Accediendo...');

      await this.faio.isAvailable().then( async (result: any) => {
        this.soportaFingerID = true;
        console.log('LOGIN - Resultado SoportaFingerID: ', result);
        await this.faio.show({
          cancelButtonTitle: 'Cancel',
          disableBackup: true,
          title: 'Reconocimiento Dactilar',
        })
          .then((data: any) => {
            console.log('LOGIN - Resultado Reconocimiento Dactilar: ', data);
            this.menuCtrl.enable(false, 'menuTrabajadores');
            this.menuCtrl.enable(true, 'menuCompleto');  */

           /*  if ( this.usuario.Tipo === 'CLIENTE') {
              console.log('ACCEDEMOS COMO CLIENTE');
              this.menuCtrl.enable(false, 'menuTrabajadores');
              this.menuCtrl.enable(true, 'menuCompleto');
              this.getCentros();
              this.navCtrl.navigateRoot('tab-inicio');

            } else if ( this.usuario.Tipo === 'CONSULTOR') {
              console.log('ACCEDEMOS COMO CONSULTOR');
              this.menuCtrl.enable(false, 'menuTrabajadores');
              this.menuCtrl.enable(true, 'menuCompleto');
              this.searchFilter();
            } else {
              if (this.usuario.EsGuardiaCivil) {

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
         /*  }).catch((error: any) => {
            this.usuarioService.dismiss();
            console.log('LOGIN: Fallo Show', error);
          });
        }).catch(() => {
          console.log('LOGIN: No soporta Finger');
          this.soportaFingerID = false;

        });
    }


  }
 */
  
 mostrarContrase() {
    console.log(this.passwordIcon2);
    this.mostrarContra = !this.mostrarContra;
    if (this.passwordIcon2 === 'eye-off-outline') {

      this.passwordIcon2 = 'eye-outline';
    } else {

      this.passwordIcon2 = 'eye-off-outline';

    }

  }

  async getDatosLogin() {
    console.log('this.usuario: ', this.usuario)
    this.usuarioService.guardarUsuarioBD(this.usuario);
    this.menuCtrl.enable(true, 'menuTrabajadores');
    this.menuCtrl.enable(false, 'menuGuardiaCivil');
    this.menuCtrl.enable(false, 'menuCompleto');

    this.navCtrl.navigateRoot('/inicio');
    await this.usuarioService.loginAPI(this.onLoginForm.value.usuario, this.onLoginForm.value.password, this.tokenAPI).then( res => {

      this.ComprobarRespuestDeAPI(res);

    });


  }

  ComprobarRespuestDeAPI(res: UsuarioLoginApi) {


    const JSONrespuesta = JSON.stringify(res);
    if (JSONrespuesta.includes('Respuesta>k__BackingField')) {
      this.usuarioService.dismiss();
      this.usuarioService.presentAlert('Datos Incorrectos', 'Compruebe sus datos de nuevo.', '');

    } else {

      try {

        this.usuario = JSON.parse(res.toString());

      } catch (error) {

        this.usuario = res;

      }

      console.log('LOGIN-DNI: Usuario de API: ', this.usuario);

      this.usuarioService.guardarUsuarioBD(this.usuario); // this.botonHuella.checked);
      console.log('LOGIN: ', this.usuario);


      this.usuarioService.dismiss();


      this.navCtrl.navigateRoot('/tab-inicio');


    }

  }

  


  async forgotPass() {

/*     window.open('https://grupompe.es/MpeNube/RecuperarPassApp.aspx', '_system');
 */
  }

  salirAPP() {

    navigator['app'].exitApp();
  }

  /* convertPassword(cadena: string): string {

    return ('0000' + cadena).slice(-'0000'.length);
  }
 */

  async mostrarTerminos() {
    console.log('PRESENT ALERT: TERMINOS');

    const modal = await this.modalCtrl.create({
      component: ModalTerminosPage
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();
    console.log('DATA: ', data);

    const aceptarDatos = data.aceptarDatos;

    if (aceptarDatos === true) {
      console.log('PRESENT ALERT: TERMINOS 20');

      this.botonTerminos.checked = true;

    }



  }

}
