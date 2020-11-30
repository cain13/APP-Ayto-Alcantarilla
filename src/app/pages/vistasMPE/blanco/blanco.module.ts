import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BlancoPageRoutingModule } from './blanco-routing.module';

import { BlancoPage } from './blanco.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BlancoPageRoutingModule
  ],
  declarations: [BlancoPage]
})
export class BlancoPageModule {}
