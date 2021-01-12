import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IncidenciasPageRoutingModule } from './incidencias-routing.module';

import { IncidenciasPage } from './incidencias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    IncidenciasPageRoutingModule
  ],
  declarations: [IncidenciasPage]
})
export class IncidenciasPageModule {}
