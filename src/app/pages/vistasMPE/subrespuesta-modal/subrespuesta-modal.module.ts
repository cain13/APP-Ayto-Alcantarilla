import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubrespuestaModalPageRoutingModule } from './subrespuesta-modal-routing.module';

import { SubrespuestaModalPage } from './subrespuesta-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubrespuestaModalPageRoutingModule
  ],
  declarations: [SubrespuestaModalPage]
})
export class SubrespuestaModalPageModule {}
