import { Injectable, NgZone } from '@angular/core';
import { LoadingController, Platform, ToastController, AlertController, NavController, ModalController } from '@ionic/angular';
import { UsuarioLogin, CambiarPassword, EmpresaConsultor, UsuarioLoginApi } from '../interfaces/usuario-interfaces';
import { DatabaseService } from './database.service';
import { Centro, Certificado, RecuentoNotificacionesResponse, Notificacion, Asistencia, Cliente, MandarTokenAPI, RespuestaAPItoken } from '../interfaces/interfaces-grupo-mpe';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotificacionesPage } from '../pages/vistasMPE/notificaciones/notificaciones.page';
import { CentroAPI } from '../interfaces/centros-interfaces';
import * as moment from 'moment';
import 'rxjs/add/operator/timeout';

const url =  'https://abm-time.com/api';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  version = 'Versión 1.0.0';
  usuario: UsuarioLoginApi;

  vieneDeLogin = false;
  cambiarPassword: CambiarPassword;


  // VARIABLES GRUPO_MPE_APP
  /* usuario: UsuarioLogin;
  empresaConsultor: EmpresaConsultor;
  cambiarPassword: CambiarPassword;
  centros: Centro[];
  certificados: Certificado[];
  clientes: Cliente[];
  notificacion: Notificacion[];
  asistencia: Asistencia[];
  citas: Asistencia[];
  haFiltrado: boolean;
  haFiltradoHistorial: boolean;
  haFiltradoAsistencia: boolean;
  haFiltradoCitas: boolean;
  desactivarSegundoPlano: boolean;
  recuentoNotificaciones: number;
  centrosFav: CentroAPI[];
  terminosOK = false;

  vieneDeLogin = false;*/

  header = new HttpHeaders().set('Content-Type', 'application/json');



  isLoading = false;

  constructor(private loadingCtrl: LoadingController,
    private dataBaseService: DatabaseService,
    private platform: Platform,
    private opener: FileOpener,
    private file: File,
    private toastController: ToastController,
    private alertCtrl: AlertController,
    private http: HttpClient,
    private modalCtrl: ModalController,
    private navController: NavController,
    private zone: NgZone,

    ) { }

    // Funciones Ayto_Alcantarilla_APP


    async loginAPI(userName: string, password: string): Promise<UsuarioLoginApi> {

      const usuario = {
        UserName: userName,
        Password: password
      };

      return await this.http.post<UsuarioLoginApi>(`${url}/LoginApp/Login`, usuario, {headers: this.header}).timeout(7000).toPromise();

    }


    async mandarTokenAPI(tokenAPI: MandarTokenAPI): Promise <RespuestaAPItoken> {
      // tslint:disable-next-line: no-shadowed-variable
      const URL = 'https://mpecronos.com/api/CommonAPI/AddUsuarioNotificacion';

      const respuesta = await  this.http.post<RespuestaAPItoken>(URL, tokenAPI, {headers: this.header}).toPromise();

      return respuesta;

    }

    guardarUsuarioBD(user: UsuarioLoginApi) {

      this.usuario = user;
      this.dataBaseService.addUsuario(user);

    }




    async present(mensaje: string) {
      this.isLoading = true;
      return await this.loadingCtrl.create({
        message: mensaje
      }).then(a => {
        a.present().then(() => {
          console.log('presented');
          if (!this.isLoading) {
            a.dismiss().then(() => console.log('abort presenting'));
          }
        }).catch(error => {

          console.log('Ha tocado en la pantalla mienstras estaba el cargando... ', error);

        });
      });
    }

    async dismiss() {
      if (this.isLoading) {

        this.isLoading = false;
        return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));

      } else {

        return null;

      }

    }

    async presentAlert(titulo: string, subtitulo: string, mensaje: string) {
      console.log('presentAlert');
      const alert = await this.alertCtrl.create({
        header: titulo,
        subHeader: subtitulo,
        message: mensaje,
        buttons: ['OK']
      });

      await alert.present();
    }

    guardarUsuario(user: UsuarioLoginApi) {

      this.usuario = user;

    }

    getUsuario(): UsuarioLoginApi {

      return this.usuario;

    }

    setLogin(bol: boolean) {

      this.vieneDeLogin = bol;

    }

    async actualizarPerfil(usuario: UsuarioLoginApi) {

      this.dataBaseService.addUsuario(usuario);

    }

    async presentToast(texto: string) {
      const toast = await this.toastController.create({
        message: texto,
        duration: 2000
      });
      toast.present();
    }

    async presentAlertNotificaciones(titulo: string, subtitulo: string, mensaje: string) {
      console.log('presentAlert');
      const alert = await this.alertCtrl.create({
        header: titulo,
        subHeader: subtitulo,
        message: mensaje,
        buttons: [
          {
            text: 'Ver más tarde',
            handler: (blah) => {
              console.log('Lanzamos ver mas tarde');
            }
          }, {
            text: 'Ver ahora',
            handler: async () => {
              await this.notifications();
            }
          }
        ]
      });
      await alert.present();
    }

    async someAsyncOperation() {
      // await this.navController.navigateForward("/test");
    }

    async presentAlertSalir(titulo: string, subtitulo: string, mensaje: string): Promise<boolean>  {
      console.log('presentAlert');
      const alerta = await this.alertCtrl.create({
        header: titulo,
        subHeader: subtitulo,
        message: mensaje,
        backdropDismiss: false,
        buttons: [
          {
            text: 'No',
            handler: (blah) => {
              console.log('Lanzamos NO');

            }
          }, {
            text: 'Si',
            handler: () => {
              navigator['app'].exitApp();
            }
          }
        ]
      });

      await alerta.present();
      return null;
    }

    async notifications() {
      const modal = await this.modalCtrl.create({
        component: NotificacionesPage
          });
      return await modal.present();
    }

    async presentAlertCerrarSesion(titulo: string, subtitulo: string, mensaje: string): Promise<boolean>  {
      console.log('presentAlert');
      const alerta = await this.alertCtrl.create({
        header: titulo,
        subHeader: subtitulo,
        message: mensaje,
        backdropDismiss: false,
        buttons: [
          {
            text: 'No',
            handler: (blah) => {
              console.log('Lanzamos NO');

            }
          }, {
            text: 'Si',
            handler: () => {
              console.log('Cerrar sesion');
              this.BorrarEmpleado();
              this.guardarUsuario(null);
              this.navController.navigateRoot('blanco');
            }
          }
        ]
      });

      await alerta.present();
      return null;
    }

    BorrarEmpleado() {
      this.dataBaseService.BorrarUsuario();
    }

    getCambiarPassword() {
      return this.cambiarPassword;
    }


    convertPassword(cadena: string): string {

      return ('0000' + cadena).slice(-'0000'.length);
    }





    // Funciones Grupo_MPE_APP

/*
  async login(usuario: UsuarioLogin) {

    await this.dataBaseService.addUsuario(usuario);

  }

  BorrarEmpleado() {
    this.dataBaseService.BorrarUsuario();
  }


  async mandarTokenAPI(tokenAPI: MandarTokenAPI): Promise <RespuestaAPItoken> {
    // tslint:disable-next-line: no-shadowed-variable
    const URL = 'https://mpecronos.com/api/CommonAPI/AddUsuarioNotificacion';


    const respuesta = await  this.http.post<RespuestaAPItoken>(URL, tokenAPI, {headers: this.header}).toPromise();

    return respuesta;


  }

  async actualizarPerfil(usuario: UsuarioLogin) {

    await this.dataBaseService.addUsuario(usuario);

  }

  guardarUsuario(usuario: UsuarioLogin) {

    this.usuario = usuario;
    if (usuario !== null && usuario !== undefined && usuario.EsGuardiaCivil !== undefined &&  usuario.EsGuardiaCivil !== null) {
      this.usuario.EsGuardiaCivil = usuario.EsGuardiaCivil;
    } else {
      if (usuario !== null && usuario !== undefined ) {
        this.usuario.EsGuardiaCivil = false;
      }
    }

  }

  getUsuario(): UsuarioLogin {

    return this.usuario;

  }

  guardarEmpresaConsultor(empresa: EmpresaConsultor) {
    this.empresaConsultor = null;
    this.empresaConsultor = empresa;

  }

  getEmpresaConsultor(): EmpresaConsultor {

    return this.empresaConsultor;

  }


  getCambiarPassword() {
    return this.cambiarPassword;
  }

  guardarCentros(centros: Centro[]) {
    console.log('usuario service: ', centros);
    this.centros = centros;

  }

  getCentros(): Centro[] {

    return this.centros;

  }

  getNotificaciones(): Notificacion[] {

    return this.notificacion;

  }


  getHistorial(): Notificacion[] {

    return this.notificacion;

  }

  setTerminos(user: UsuarioLogin, bol: boolean) {

    this.terminosOK = bol;
    console.log('this.terminosOK: ', this.terminosOK);
    try {
        const xmlhttp = new XMLHttpRequest();
        console.log('ACTUALIZAMOS DATOS BD 1... ');

        xmlhttp.open('POST', 'https://grupompe.es/MpeNube/ws/DocumentosWS.asmx', true);
        xmlhttp.setRequestHeader('content-type', 'text/xml');

        xmlhttp.responseType = 'document';
          // the following variable contains my xml soap request (that you can get thanks to SoapUI for example)
        const sr =
            '<?xml version="1.0" encoding="utf-8"?>' +
            '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
              '<soap:Header>' +
                '<AuthHeader xmlns="http://tempuri.org/">' +
                  '<Usuario>' + user.Usuario + '</Usuario>' +
                  '<Password>' + user.Password + '</Password>' +
                '</AuthHeader>' +
              '</soap:Header>' +
              '<soap:Body>' +
                '<AceptarTerminos xmlns="http://tempuri.org/">' +
                  '<Aceptado>' + true + '</Aceptado>' +
                '</AceptarTerminos>' +
              '</soap:Body>' +
            '</soap:Envelope>';

       xmlhttp.onreadystatechange = () => {

        console.log('XMLHTTP: ', xmlhttp);

              if (xmlhttp.readyState === 4) {
                  if (xmlhttp.status === 200) {
                      const xml = xmlhttp.responseXML;
                      console.log('Guardado en la API correctamente');


                  } else if (xmlhttp.status === 500 ) {
                    console.log('Error al guardar en la API');
                  }
              }
          };
        xmlhttp.send(sr);
      } catch (error) {
        console.log('Error: ', error);

      }

  }

  getTerminos() {

    return this.terminosOK;

  }



  getCertificados(): Certificado[] {

    return this.certificados;

  }

  guardarClientes(array: Cliente[]) {
    this.clientes = [];

    this.clientes = array;

  }

  getClientes(): Cliente[] {

    return this.clientes;

  }


  getAsistencia(): Asistencia[] {

    return this.asistencia;

  }


  getCitas(): Asistencia[] {

    return this.citas;

  }

  setLogin(bol: boolean) {

    this.vieneDeLogin = bol;

  }

  getLogin() {

    return this.vieneDeLogin;

  }

  async addCentroFav(centro: CentroAPI) {

    await this.dataBaseService.addCentroFav(centro).then(res => {

      console.log('UsuarioService: AddCentroFav todo OK ', centro);

    }).catch(error => {
      console.log('ERROR AddCentroFav UsuarioService: ', error);

    });

  }

  async borrarCentroFav(id: number) {

    await this.dataBaseService.borrarCentroFav(id).then(res => {

      console.log('UsuarioService: BorrarCentroFav todo OK ', id);

    }).catch(error => {
      console.log('ERROR BorrarCentroFav UsuarioService: ', error);

    });

  }




  async present(mensaje: string) {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      message: mensaje
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      }).catch(error => {

        console.log('Ha tocado en la pantalla mienstras estaba el cargando... ', error);

      });
    });
  }

  async dismiss() {
    if (this.isLoading) {

      this.isLoading = false;
      return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));

    } else {

      return null;

    }

  }

  async presentAlert(titulo: string, subtitulo: string, mensaje: string) {
    console.log('presentAlert');
    const alert = await this.alertCtrl.create({
      header: titulo,
      subHeader: subtitulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlertTest(titulo: string, subtitulo: string, mensaje: string): Promise<boolean>  {
    console.log('presentAlert');
    const cerrar = false;
    const alerta = await this.alertCtrl.create({
      header: titulo,
      subHeader: subtitulo,
      message: mensaje,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Ver más tarde',
          handler: (blah) => {
            console.log('Lanzamos ver mas tarde');

          }
        }, {
          text: 'Ver ahora',
          handler: () => {
            const navTransition = alerta.dismiss();

            this.someAsyncOperation().then(() => {
              console.log('someAsyncOperation');
              navTransition.then(() => {
                console.log('navTransition.then');
                this.navController.navigateForward('/test');
              });
            });
            return false;
          }
        }
      ]
    });

    await alerta.present();

    return null;
  }

  async presentAlertTestMantouxBotones(titulo: string, subtitulo: string, mensaje: string, fecha: string): Promise<boolean>  {
    console.log('presentAlert');
    const cerrar = false;
    const alerta = await this.alertCtrl.create({
      header: titulo,
      subHeader: subtitulo,
      message: mensaje,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Ver más tarde',
          handler: (blah) => {
            if (this.usuario !== undefined && this.usuario != null && this.usuario.RequiereMantoux !== undefined && this.usuario.RequiereMantoux != null ) {
              this.usuario.HacerMantoux = true;
              this.usuario.FechaMantoux = moment(fecha).locale('es').format().toString();
              console.log('FECHA USUARIO: ', this.usuario.FechaMantoux);
              console.log('Fecha fecha: ' , moment().locale('es').format().toString());
              this.actualizarPerfil(this.usuario);
              this.guardarUsuario(this.usuario);
            } else {
              this.usuario = this.getUsuario();
              this.usuario.HacerMantoux = true;
              this.usuario.FechaMantoux = moment(fecha).locale('es').format().toString();
              console.log('FECHA USUARIO: ', this.usuario.FechaMantoux);
              console.log('Fecha fecha: ' , moment().locale('es').format().toString());
              this.actualizarPerfil(this.usuario);
              this.guardarUsuario(this.usuario);
            }
            console.log('Lanzamos ver mas tarde');

          }
        }, {
          text: 'Ver ahora',
          handler: () => {
            const navTransition = alerta.dismiss();

            if (this.usuario !== undefined && this.usuario != null && this.usuario.RequiereMantoux !== undefined && this.usuario.RequiereMantoux != null ) {
              this.usuario.HacerMantoux = true;
              this.usuario.FechaMantoux = moment(fecha).locale('es').format().toString();
              console.log('FECHA USUARIO: ', this.usuario.FechaMantoux);
              console.log('Fecha fecha: ' , moment().locale('es').format().toString());
              this.actualizarPerfil(this.usuario);
              this.guardarUsuario(this.usuario);
            } else {
              this.usuario = this.getUsuario();
              this.usuario.HacerMantoux = true;
              this.usuario.FechaMantoux = moment(fecha).locale('es').format().toString();
              console.log('FECHA USUARIO: ', this.usuario.FechaMantoux);
              console.log('Fecha fecha: ' , moment().locale('es').format().toString());
              this.actualizarPerfil(this.usuario);
              this.guardarUsuario(this.usuario);
            }

            this.someAsyncOperation().then(() => {
              console.log('someAsyncOperation');
              navTransition.then(() => {
                console.log('navTransition.then');
                this.navController.navigateForward('/vista-tuberculina-inicio');
              });
            });
            return false;
          }
        }
      ]
    });

    await alerta.present();

    return null;
  }

  async presentAlertNoTestMontoux(titulo: string, subtitulo: string, mensaje: string): Promise<boolean>  {
    console.log('presentAlert');
    const alerta = await this.alertCtrl.create({
      header: titulo,
      subHeader: subtitulo,
      message: mensaje,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Cerrar',
          handler: () => {
            const navTransition = alerta.dismiss();

            this.someAsyncOperation().then(() => {
              console.log('someAsyncOperation');
              navTransition.then(() => {
                this.navController.navigateRoot('tab-inicio');
              });
            });
            return false;
          }
        }
      ]
    });

    await alerta.present();
    return null;
  }

  async someAsyncOperation() {
    // await this.navController.navigateForward("/test");
  }

  async presentAlertSalir(titulo: string, subtitulo: string, mensaje: string): Promise<boolean>  {
    console.log('presentAlert');
    const alerta = await this.alertCtrl.create({
      header: titulo,
      subHeader: subtitulo,
      message: mensaje,
      backdropDismiss: false,
      buttons: [
        {
          text: 'No',
          handler: (blah) => {
            console.log('Lanzamos NO');

          }
        }, {
          text: 'Si',
          handler: () => {
            navigator['app'].exitApp();
          }
        }
      ]
    });

    await alerta.present();
    return null;
  }

  async presentAlertCerrarSesion(titulo: string, subtitulo: string, mensaje: string): Promise<boolean>  {
    console.log('presentAlert');
    const alerta = await this.alertCtrl.create({
      header: titulo,
      subHeader: subtitulo,
      message: mensaje,
      backdropDismiss: false,
      buttons: [
        {
          text: 'No',
          handler: (blah) => {
            console.log('Lanzamos NO');

          }
        }, {
          text: 'Si',
          handler: () => {
            console.log('Cerrar sesion');
            this.BorrarEmpleado();
            this.guardarUsuario(null);
            this.navController.navigateRoot('blanco');
          }
        }
      ]
    });

    await alerta.present();
    return null;
  }


  async presentAlertNotificaciones(titulo: string, subtitulo: string, mensaje: string) {
    console.log('presentAlert');
    const alert = await this.alertCtrl.create({
      header: titulo,
      subHeader: subtitulo,
      message: mensaje,
      buttons: [
        {
          text: 'Ver más tarde',
          handler: (blah) => {
            console.log('Lanzamos ver mas tarde');
          }
        }, {
          text: 'Ver ahora',
          handler: async () => {
            await this.notifications();
          }
        }
      ]
    });
    await alert.present();
  }

  async notifications() {
    const modal = await this.modalCtrl.create({
      component: NotificacionesPage
        });
    return await modal.present();
  }

  saveAndOpenPdf(pdf: string, filename: string) {
    console.log('pdf ' + pdf);
    console.log('externalApplicationStorageDirectory ' + this.file.externalApplicationStorageDirectory + 'Download/' + filename);
    const writeDirectory = this.platform.is('ios') ? this.file.dataDirectory : this.file.externalApplicationStorageDirectory + 'Download/';
    this.file.writeFile(writeDirectory, filename, this.convertBase64ToBlob(pdf, 'data:application/pdf;base64', 512), {replace: true})
      .then(() => {
          this.opener.open(writeDirectory + filename, 'application/pdf')
              .catch(() => {
                  console.log('Error opening pdf file');
              });
      })
      .catch((error) => {
          console.error('Error writing pdf file', error);
          console.log('patherror ' + this.file.externalDataDirectory + filename);
          // tslint:disable-next-line: no-shadowed-variable
          const writeDirectory = this.platform.is('ios') ? this.file.dataDirectory :  this.file.dataDirectory;
          console.log('writeDirectory ' + writeDirectory + filename);
          this.file.writeFile(writeDirectory, filename, this.convertBase64ToBlob(pdf, 'data:application/pdf;base64', 512), {replace: true})
            .then(() => {
                this.opener.open(writeDirectory + filename, 'application/pdf')
                    .catch(() => {
                        console.log('Error opening pdf file');
                    });
            })
            // tslint:disable-next-line: no-shadowed-variable
            .catch((error) => {
                console.error('Error writing pdf file', error);
            });
      });
  }

  convertBase64ToBlob(b64Data, contentType, sliceSize) {
    console.log(b64Data);
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {

            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

  const blob = new Blob(byteArrays, {type: contentType});
  return blob;
  }

  async presentToast(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 2000
    });
    toast.present();
  }

  async presentAlertTestMantoux(titulo: string, subtitulo: string, mensaje: string, fecha: string): Promise<boolean>  {
    console.log('presentAlert');
    const cerrar = false;
    const alerta = await this.alertCtrl.create({
      header: titulo,
      subHeader: subtitulo,
      message: mensaje,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Ver más tarde',
          handler: (blah) => {
            console.log('Lanzamos ver mas tarde');

          }
        }, {
          text: 'Ver ahora',
          handler: () => {
            const navTransition = alerta.dismiss();
            if (this.usuario !== undefined && this.usuario != null && this.usuario.RequiereMantoux !== undefined && this.usuario.RequiereMantoux != null ) {
              this.usuario.HacerMantoux = true;
              this.usuario.FechaMantoux = moment(fecha).locale('es').format().toString();
              console.log('FECHA USUARIO: ', this.usuario.FechaMantoux);
              console.log('Fecha fecha: ' , moment().locale('es').format().toString());
              this.actualizarPerfil(this.usuario);
              this.guardarUsuario(this.usuario);
            } else {
              this.usuario = this.getUsuario();
              this.usuario.HacerMantoux = true;
              this.usuario.FechaMantoux = moment(fecha).locale('es').format().toString();
              console.log('FECHA USUARIO: ', this.usuario.FechaMantoux);
              console.log('Fecha fecha: ' , moment().locale('es').format().toString());
              this.actualizarPerfil(this.usuario);
              this.guardarUsuario(this.usuario);
            }
            this.someAsyncOperation().then(() => {
              console.log('someAsyncOperation');
              navTransition.then(() => {
                console.log('navTransition.then');
                this.navController.navigateForward('/vista-tuberculina-inicio');
              });
            });
            return false;
          }
        }
      ]
    });

    await alerta.present();

    return null;
  } */





}
