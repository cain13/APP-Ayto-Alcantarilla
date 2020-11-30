import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FiltroCitasPageRoutingModule } from './filtro-citas-routing.module';

import { FiltroCitasPage } from './filtro-citas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FiltroCitasPageRoutingModule
  ],
  declarations: [FiltroCitasPage]
})
export class FiltroCitasPageModule {}
