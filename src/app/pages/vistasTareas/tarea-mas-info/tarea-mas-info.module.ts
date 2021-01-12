import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TareaMasInfoPageRoutingModule } from './tarea-mas-info-routing.module';

import { TareaMasInfoPage } from './tarea-mas-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TareaMasInfoPageRoutingModule
  ],
  declarations: [TareaMasInfoPage]
})
export class TareaMasInfoPageModule {}
