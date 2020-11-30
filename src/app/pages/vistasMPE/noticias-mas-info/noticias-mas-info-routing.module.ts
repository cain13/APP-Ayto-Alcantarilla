import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoticiasMasInfoPage } from './noticias-mas-info.page';

const routes: Routes = [
  {
    path: '',
    component: NoticiasMasInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoticiasMasInfoPageRoutingModule {}
