import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TareasInicioPage } from './tareas-inicio.page';

const routes: Routes = [
  {
    path: '',
    component: TareasInicioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TareasInicioPageRoutingModule {}
