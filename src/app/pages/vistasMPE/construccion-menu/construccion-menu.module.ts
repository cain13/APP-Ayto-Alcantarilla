import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConstruccionMenuPageRoutingModule } from './construccion-menu-routing.module';

import { ConstruccionMenuPage } from './construccion-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConstruccionMenuPageRoutingModule
  ],
  declarations: [ConstruccionMenuPage]
})
export class ConstruccionMenuPageModule {}
