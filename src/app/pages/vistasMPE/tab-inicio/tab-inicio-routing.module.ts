import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabInicioPage } from './tab-inicio.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tab-inicio/inicio',
    pathMatch: 'full'
  },
  {
    path: '',
    component: TabInicioPage,
    children: [
      {
        path: 'vigilancia-salud',
        loadChildren: () => import('../construccion/construccion.module').then( m => m.ConstruccionPageModule)
      },
      {
        path: 'home-location-menu',
        loadChildren: () => import('../construccion/construccion.module').then( m => m.ConstruccionPageModule)
      },
      {
        path: 'inicio',
        loadChildren: () => import('../inicio/inicio.module').then( m => m.InicioPageModule)
      },
      {
        path: 'citas-pendientes',
        loadChildren: () => import('../construccion/construccion.module').then( m => m.ConstruccionPageModule)
      },
      {
        path: 'documentos',
        loadChildren: () => import('../construccion/construccion.module').then( m => m.ConstruccionPageModule)
      },
      {
        path: 'citas-pendientes-trabajador',
        loadChildren: () => import('../construccion/construccion.module').then( m => m.ConstruccionPageModule)
      },
      {
        path: 'documentos-trabajador',
        loadChildren: () => import('../construccion/construccion.module').then( m => m.ConstruccionPageModule)
      },
      {
        path: 'documentos-covid',
        loadChildren: () => import('../construccion/construccion.module').then( m => m.ConstruccionPageModule)
      },
      {
        path: 'test-menu',
        loadChildren: () => import('../construccion/construccion.module').then( m => m.ConstruccionPageModule)
      },
      {
        path: 'formacion',
        loadChildren: () => import('../construccion/construccion.module').then( m => m.ConstruccionPageModule)
      },


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabInicioPageRoutingModule {}
