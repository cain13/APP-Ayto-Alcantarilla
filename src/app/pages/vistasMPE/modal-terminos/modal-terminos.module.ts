import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalTerminosPageRoutingModule } from './modal-terminos-routing.module';

import { ModalTerminosPage } from './modal-terminos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalTerminosPageRoutingModule
  ],
  declarations: [ModalTerminosPage]
})
export class ModalTerminosPageModule {}
