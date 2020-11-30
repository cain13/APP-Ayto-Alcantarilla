import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeleccionarClientePage } from './seleccionar-cliente.page';

const routes: Routes = [
  {
    path: '',
    component: SeleccionarClientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeleccionarClientePageRoutingModule {}
