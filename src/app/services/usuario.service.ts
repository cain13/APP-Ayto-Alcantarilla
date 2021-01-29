import { Injectable } from '@angular/core';
import { LoadingController, Platform, ToastController, AlertController, NavController, ModalController } from '@ionic/angular';
import { CambiarPassword, MandarTokenAPI, UsuarioLoginApi, UsuarioLoginAPP, RespuestaAPIBasica, DatosActualziarPassApi, EnviosPendientes, NotificacionesPendientes } from '../interfaces/usuario-interfaces';
import { DatabaseService } from './database.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotificacionesPage } from '../pages/vistasMPE/notificaciones/notificaciones.page';
import 'rxjs/add/operator/timeout';
import { TipoIncidencia } from '../interfaces/interfacesTareas';

const url =  'https://intranet-ayto.com/api';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  listaTipoIncidencias: TipoIncidencia[] = [
    {
    IdIncidencia: 0,
    Nombre: 'Usuario Ausente'
  },
  {
    IdIncidencia: 1,
    Nombre: 'Otros'
  }
];

  version = 'Versión 1.0.0';
  usuario: UsuarioLoginApi;

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

  //#region  FUNCIONS LOGIN


    async loginAPI(userName: string, password: string, token: string): Promise<UsuarioLoginApi> {

      const usuario: UsuarioLoginAPP = {
        UserName: userName,
        Password: password,
        Token: token
      };

      return await this.http.post<UsuarioLoginApi>(`${url}/Ayto/Login`, usuario, {headers: this.header}).timeout(7000).toPromise();

    }


    async actualizarDatosUsuarioAPI( user: UsuarioLoginApi): Promise<RespuestaAPIBasica> {

      const datosUsuario = {
        
        UserName: user.UserName,
        Password: user.Password,
        Email: user.Email,
        Telefono: user.Telefono,
      };
      return await this.http.post<RespuestaAPIBasica>(`${url}/Ayto/EditarPerfil`, datosUsuario).toPromise();
  
    }

    async actualizarPasswordAPI( username: string, passOld: string, passNew: string): Promise<RespuestaAPIBasica> {

      const datosUsuario = {
  
        UserName: username,
        Password: passOld,
        PasswordNew: passNew
        
      };
      return await this.http.post<RespuestaAPIBasica>(`${url}/Ayto/CambioPass`, datosUsuario).toPromise();
  
    }

    guardarUsuarioBD(user: UsuarioLoginApi) {
      
      this.usuario = user;
      this.dataBaseService.addUsuario(user);
      this.dataBaseService.guardarArrayIncidencias(user.TipoIncidencias);

      if(user.NotificacionesPendientes !== null && user.NotificacionesPendientes !== undefined) {
        let notificacionesPendientes: NotificacionesPendientes[] = []
        if (Array.isArray(user.NotificacionesPendientes)) {

          notificacionesPendientes = user.NotificacionesPendientes;

        } else {

          notificacionesPendientes.push(notificacionesPendientes[0]);

        }

        this.dataBaseService.addNotificacionesPendientes(user.NotificacionesPendientes);

      }
      

    }


//#endregion


    

    

    async enviarEnviosPendientes() {

      let enviosPendientes: EnviosPendientes[] = [];
      
      await this.dataBaseService.obtenerTodosJsonPendientes().then( data => {

        enviosPendientes = data;

      }).catch( error => {

        console.log('ERROR, envios pendientes db');

      });
      if (enviosPendientes.length !== 0) {

        let objetoJson: any;

        for(let envio of enviosPendientes) {
          console.log('envio pendiente: ', objetoJson);
          const contenido = JSON.parse(envio.Contenido);
          if( envio.TipoJsonPendiente.toLocaleUpperCase() === 'FIRMA') {

            objetoJson = {
              IdUsuario: contenido.IdUsuario,
              IdTarea: contenido.IdTarea,
              FirmaBase64: contenido.FirmaBase64
            }

          } else if (envio.TipoJsonPendiente.toLocaleUpperCase() === 'NOTIFICACION'){

            objetoJson = {
              IdNotificacion: contenido.IdNotificacion,
            }


          } else {

            objetoJson = {
              UserName: contenido.UserName,
              IdTipoIncidencia: contenido. IdTipoIncidencia,
              Descripcion: contenido.Descripcion,
              IdEventoServicio: contenido.IdEventoServicio,
              FechaIncidencia: contenido.FechaIncidencia
            }

          }

          
          console.log('envio pendiente: ', objetoJson);
          await this.http.post<RespuestaAPIBasica>(envio.Url, objetoJson).toPromise().then( async data => {
            console.log('Envio pendiente enviado correctamente: ', contenido);
            await this.dataBaseService.borrarJSONPendiente(envio.IdEnvioPendiente).then(data => {

              console.log('Envio Pendiente eliminado')

            }).catch( error => {

              console.log('Error, al borrar el JsonPendiente de la BD.')

            });
            

          }).catch(error => {

            console.log('ERROR, envio pendiente: ', error, ' CONTENIDO: ', contenido)

          });

        }

      } else {

        console.log('No hay envios pendientes.');

      }

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

    

    async notifications() {
      const modal = await this.modalCtrl.create({
        component: NotificacionesPage
          });
      return await modal.present();
    }

   //#region FUNCIONS RUTINARIAS

    BorrarEmpleado() {
      this.dataBaseService.BorrarUsuario();
    }

    getCambiarPassword() {
      return this.cambiarPassword;
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


    convertPassword(cadena: string): string {

      return ('0000' + cadena).slice(-'0000'.length);
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

  //#endregion

}
