import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FiltroDocumentosPageRoutingModule } from './filtro-documentos-routing.module';

import { FiltroDocumentosPage } from './filtro-documentos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FiltroDocumentosPageRoutingModule
  ],
  declarations: [FiltroDocumentosPage]
})
export class FiltroDocumentosPageModule {}
