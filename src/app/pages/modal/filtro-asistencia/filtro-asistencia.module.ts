import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FiltroAsistenciaPageRoutingModule } from './filtro-asistencia-routing.module';

import { FiltroAsistenciaPage } from './filtro-asistencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FiltroAsistenciaPageRoutingModule
  ],
  declarations: [FiltroAsistenciaPage]
})
export class FiltroAsistenciaPageModule {}
