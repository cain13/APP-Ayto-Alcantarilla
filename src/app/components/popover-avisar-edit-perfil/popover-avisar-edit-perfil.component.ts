import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { IonCheckbox, NavController, PopoverController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioLoginApi } from '../../interfaces/usuario-interfaces';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-popover-avisar-edit-perfil',
  templateUrl: './popover-avisar-edit-perfil.component.html',
  styleUrls: ['./popover-avisar-edit-perfil.component.scss'],
})
export class PopoverAvisarEditPerfilComponent implements OnInit {

  valorCheck = false;
  @ViewChild('CheckRespuesta', {static: false}) botonCheck: IonCheckbox;
  usuario: UsuarioLoginApi;

  constructor(private usuarioService: UsuarioService,
              private navCtrl: NavController,
              private popoverController: PopoverController) { }

  ngOnInit() {

    this.usuario = this.usuarioService.getUsuario();

  }

  async guardarCheck() {

    console.log('BotonCheck: ', this.botonCheck);

  }

  editarPerfil() {
    this.popoverController.dismiss();
    this.navCtrl.navigateForward('edit-profile');
  }

  cerrarPopover() {

    this.popoverController.dismiss();

  }

}
