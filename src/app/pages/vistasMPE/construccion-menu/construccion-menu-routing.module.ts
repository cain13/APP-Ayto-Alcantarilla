import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConstruccionMenuPage } from './construccion-menu.page';

const routes: Routes = [
  {
    path: '',
    component: ConstruccionMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConstruccionMenuPageRoutingModule {}
