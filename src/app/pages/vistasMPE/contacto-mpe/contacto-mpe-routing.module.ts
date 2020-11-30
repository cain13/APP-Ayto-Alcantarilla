import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactoMpePage } from './contacto-mpe.page';

const routes: Routes = [
  {
    path: '',
    component: ContactoMpePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactoMpePageRoutingModule {}
