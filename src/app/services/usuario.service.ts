import { Injectable } from '@angular/core';
import { LoadingController, Platform, ToastController, AlertController, NavController, ModalController } from '@ionic/angular';
import { CambiarPassword, MandarTokenAPI, RespuestaAPItoken, UsuarioLoginApi, UsuarioLogin } from '../interfaces/usuario-interfaces';
import { DatabaseService } from './database.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotificacionesPage } from '../pages/vistasMPE/notificaciones/notificaciones.page';
import 'rxjs/add/operator/timeout';

const url =  'https://abm-time.com/api';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  version = 'Versión 1.0.0';
  usuario: UsuarioLoginApi = {

    UserName: '12345651A',
    Password: 1234,
    NombreCompleto: 'Tecnico 1',
    RememberMe: true,
    FingerID: false
  };

  vieneDeLogin = false;
  cambiarPassword: CambiarPassword;


  header = new HttpHeaders().set('Content-Type', 'application/json');



  isLoading = false;

  constructor(private loadingCtrl: LoadingController,
    private dataBaseService: DatabaseService,
    private toastController: ToastController,
    private alertCtrl: AlertController,
    private http: HttpClient,
    private modalCtrl: ModalController,
    private navController: NavController,
    ) { }

    // Funciones Ayto_Alcantarilla_APP


    async loginAPI(userName: string, password: string): Promise<UsuarioLoginApi> {

      const usuario: UsuarioLoginApi = {
        UserName: userName,
        Password: parseInt(password, 10),
        FingerID: false,
        NombreCompleto: '',
        RememberMe: false
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

}
