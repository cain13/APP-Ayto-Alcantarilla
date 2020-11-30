import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalMasInfoPageRoutingModule } from './modal-mas-info-routing.module';

import { ModalMasInfoPage } from './modal-mas-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalMasInfoPageRoutingModule
  ],
  declarations: [ModalMasInfoPage]
})
export class ModalMasInfoPageModule {}
