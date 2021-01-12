import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TareaMasInfoPage } from './tarea-mas-info.page';

const routes: Routes = [
  {
    path: '',
    component: TareaMasInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TareaMasInfoPageRoutingModule {}
