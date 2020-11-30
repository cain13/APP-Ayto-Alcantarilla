import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FiltroDocumentosPage } from './filtro-documentos.page';

const routes: Routes = [
  {
    path: '',
    component: FiltroDocumentosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FiltroDocumentosPageRoutingModule {}
