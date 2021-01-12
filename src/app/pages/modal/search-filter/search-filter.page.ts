import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CentrosMPEFiltros} from 'src/app/interfaces/usuario-interfaces';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UsuarioLoginApi } from '../../../interfaces/usuario-interfaces';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.page.html',
  styleUrls: ['./search-filter.page.scss'],
})
export class SearchFilterPage implements OnInit {


  usuario: UsuarioLoginApi;
  listaCentros = [];
  CodigoPostalFiltro: string;
  ProvinciaFiltro: string;
  LocalidadFiltro: string;


  constructor(private modalCtrl: ModalController, private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuario = this.usuarioService.getUsuario();
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  filtrar() {
    const datosFil: CentrosMPEFiltros = {
      codigoPostal: this.CodigoPostalFiltro,
      provincia: this.ProvinciaFiltro,
      localidad: this.LocalidadFiltro,
    };

    this.closeModal();

  }

}
