import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeLocationMenuPage } from './home-location-menu.page';

const routes: Routes = [
  {
    path: '',
    component: HomeLocationMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeLocationMenuPageRoutingModule {}
