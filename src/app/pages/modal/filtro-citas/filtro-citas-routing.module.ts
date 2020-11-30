import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FiltroCitasPage } from './filtro-citas.page';

const routes: Routes = [
  {
    path: '',
    component: FiltroCitasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FiltroCitasPageRoutingModule {}
