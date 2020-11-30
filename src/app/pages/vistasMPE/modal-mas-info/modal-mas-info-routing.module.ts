import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalMasInfoPage } from './modal-mas-info.page';

const routes: Routes = [
  {
    path: '',
    component: ModalMasInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalMasInfoPageRoutingModule {}
