import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalTerminosPage } from './modal-terminos.page';

const routes: Routes = [
  {
    path: '',
    component: ModalTerminosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalTerminosPageRoutingModule {}
