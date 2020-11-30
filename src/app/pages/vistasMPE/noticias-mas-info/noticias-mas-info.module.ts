import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoticiasMasInfoPageRoutingModule } from './noticias-mas-info-routing.module';

import { NoticiasMasInfoPage } from './noticias-mas-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NoticiasMasInfoPageRoutingModule
  ],
  declarations: [NoticiasMasInfoPage]
})
export class NoticiasMasInfoPageModule {}
