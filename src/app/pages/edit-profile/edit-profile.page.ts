import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, LoadingController, ToastController, AlertController, MenuController } from '@ionic/angular';
import { TranslateProvider } from '../../providers';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CambiarPasswordPage } from '../vistasMPE/cambiar-password/cambiar-password.page';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from '../../services/database.service';
import { NotificacionesService } from '../../services/notificaciones.service';
import { UsuarioLoginApi } from '../../interfaces/usuario-interfaces';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  Nombre = '';
  Tipo = '';
  Email = '';
  Movil = '';
  DNI = '';

  usuario: UsuarioLoginApi;
  EsGuardiaCivil = false;
  public editProfileForm: FormGroup;

  constructor(
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private translate: TranslateProvider,
    private usuarioService: UsuarioService,
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private menuCtrl: MenuController

    ) { }

  ngOnInit() {
    this.menuCtrl.close();
    this.Nombre = this.usuarioService.usuario.NombreCompleto;
    this.Tipo = this.usuarioService.usuario.UserName;
    this.usuario = this.usuarioService.getUsuario();
    console.log('this.usuario edit-profile: ', this.usuario);
    

    this.Email = this.usuario.Email;
    this.Movil = this.usuario.Telefono;
    this.DNI = this.usuario.UserName;
    this.Nombre = this.usuario.NombreCompleto;

    console.log('Nombre: ', this.Nombre);
    console.log('movil: ', this.Movil);
    console.log('email: ', this.Email);

    if( this.Email === null ||  this.Email === undefined) {

      this.Email = ""

    }

    if( this.Movil === null ||  this.Movil === undefined) {

      this.Movil = ""

    }

    this.editProfileForm = this.formBuilder.group({
      nombre: new FormControl({value: this.Nombre.toString(), disabled: true}, Validators.required),
      
      DNI: new FormControl({value: this.DNI.toString(), disabled: true}, Validators.required),
      movil: [this.Movil.toString(), Validators.compose([
        Validators.required
      ])],
      email: [this.Email.toString(), Validators.compose([
        Validators.required
      ])]
    });


  }



  async sendData() {
    // send booking info
    const loader = await this.loadingCtrl.create({
      duration: 2000
    });

    loader.present();
    loader.onWillDismiss().then(async l => {
      const toast = await this.toastCtrl.create({
        cssClass: 'bg-profile',
        message: 'Su información a sido modificada!',
        duration: 3000,
        position: 'bottom',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });

      toast.present();
      this.navCtrl.navigateForward('/home-location');
    });
    // end
  }

  guardarCambios() {
    this.usuarioService.present('Guardando datos...');
    const aux: UsuarioLoginApi = this.usuario;
    aux.Email = this.editProfileForm.value.email;
    aux.NombreCompleto = this.Nombre;
    aux.Telefono = this.editProfileForm.value.movil;

    this.usuarioService.actualizarDatosUsuarioAPI(aux).then( resp => {
      console.log('RESPUESTA API EDIT PERFIL: ', resp);
      if (resp.Respuesta.toString().toLocaleUpperCase() !== 'OK') {
        this.usuarioService.dismiss();
        this.usuarioService.presentAlert('Error', 'No se han podido guardar sus datos', 'Intentelo de nuevo más tarde');
        
      } else {
        this.usuarioService.actualizarPerfil(aux);
        this.usuarioService.dismiss();
        this.usuarioService.presentToast('Datos actualizados correctamente');

      }

    }).catch( error => {

      this.usuarioService.dismiss();
      this.usuarioService.presentAlert('Error', 'No se han podido guardar sus datos', 'Intentelo de nuevo más tarde');  

    });  
    
    
  }

  async cambiarPassword () {
    const modal = await this.modalCtrl.create({
      component: CambiarPasswordPage
    });
    return await modal.present();
  }
  cambiarUsuario() {
    this.usuarioService.setLogin(false);
    this.navCtrl.navigateForward('/login');
  }

  editarImagen() {
    this.usuarioService.presentToast('Esta funcionalidad no esta disponible en este momento...');
  }

  Borrardatos() {
    this.presentAlertConfirm();
  }

 async presentAlertConfirm() {
    const alert = await this.alertController.create({

      header: 'Confirmar!',
      message: '<strong>¿Desa salir y borrar los datos de acceso?<strong>',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Salir',
          handler: () => {
            console.log('Confirm Okay');
            this.usuarioService.BorrarEmpleado();
            this.usuarioService.guardarUsuario(null);
            this.navCtrl.navigateRoot('login');
          }
        }
      ]
    });

    await alert.present();
  }
}
