import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubrespuestaModalPage } from './subrespuesta-modal.page';

const routes: Routes = [
  {
    path: '',
    component: SubrespuestaModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubrespuestaModalPageRoutingModule {}
