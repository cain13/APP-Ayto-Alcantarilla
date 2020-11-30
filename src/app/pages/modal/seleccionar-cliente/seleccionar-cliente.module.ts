import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeleccionarClientePageRoutingModule } from './seleccionar-cliente-routing.module';

import { SeleccionarClientePage } from './seleccionar-cliente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeleccionarClientePageRoutingModule
  ],
  declarations: [SeleccionarClientePage]
})
export class SeleccionarClientePageModule {}
