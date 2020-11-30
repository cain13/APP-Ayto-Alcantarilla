import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FiltroHistorialPage } from './filtro-historial.page';

const routes: Routes = [
  {
    path: '',
    component: FiltroHistorialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FiltroHistorialPageRoutingModule {}
