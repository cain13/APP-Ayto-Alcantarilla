import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TareasInicioPageRoutingModule } from './tareas-inicio-routing.module';

import { TareasInicioPage } from './tareas-inicio.page';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TareasInicioPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TareasInicioPage]
})
export class TareasInicioPageModule {}
