import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  lang: any;
  enableNotifications: any;
  paymentMethod: any;
  currency: any;
  enablePromo: any;
  enableHistory: any;

  Nombre = '';
  Tipo = '';
  languages: any = ['Español', 'Catalan', 'Vasco'];
  paymentMethods: any = ['Paypal', 'Tarjeta de Credito'];
  currencies: any = ['USD', 'BRL', 'EUR'];

  constructor(public navCtrl: NavController, private usuarioService: UsuarioService) { }


  ngOnInit() {
    this.Nombre = this.usuarioService.usuario.NombreCompleto;
    this.Tipo = this.usuarioService.usuario.UserName;
  }

  editProfile() {
    this.navCtrl.navigateForward('edit-profile');
  }

  logout() {
    this.navCtrl.navigateRoot('login');
  }

}
