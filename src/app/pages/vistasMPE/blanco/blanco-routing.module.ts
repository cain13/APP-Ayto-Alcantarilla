import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlancoPage } from './blanco.page';

const routes: Routes = [
  {
    path: '',
    component: BlancoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlancoPageRoutingModule {}
