import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '',     loadChildren: () => import('./pages/vistasMPE/blanco/blanco.module').then( m => m.BlancoPageModule)},
  { path: 'walkthrough', loadChildren: () => import('./pages/walkthrough/walkthrough.module').then(m => m.WalkthroughPageModule) },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule) },
  { path: 'settings', loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule) },
  { path: 'edit-profile', loadChildren: () => import('./pages/edit-profile/edit-profile.module').then(m => m.EditProfilePageModule) },
  { path: 'messages', loadChildren: () => import('./pages/messages/messages.module').then(m => m.MessagesPageModule) },
  { path: 'message/:id', loadChildren: () => import('./pages/message/message.module').then(m => m.MessagePageModule) },
  { path: 'search-filter', loadChildren: () => import('./pages/modal/search-filter/search-filter.module').then(m => m.SearchFilterPageModule) },
  { path: 'extras/profile-one', loadChildren: () => import('./pages/extras/profile-one/profile-one.module').then(m => m.ProfileOnePageModule) },
  { path: 'extras/profile-two', loadChildren: () => import('./pages/extras/profile-two/profile-two.module').then(m => m.ProfileTwoPageModule) },
  { path: 'extras/timeline', loadChildren: () => import('./pages/extras/timeline/timeline.module').then(m => m.TimelinePageModule) },
  { path: 'extras/authentication', loadChildren: () => import('./pages/extras/authentication/authentication.module').then(m => m.AuthenticationPageModule) },
  { path: 'extras/popupmenu', loadChildren: () => import('./pages/extras/popupmenu/popupmenu.module').then(m => m.PopupmenuPageModule) },
  { path: 'extras/charts', loadChildren: () => import('./pages/extras/charts/charts.module').then(m => m.ChartsPageModule) },
  { path: 'extras/post', loadChildren: () => import('./pages/extras/post/post.module').then(m => m.PostPageModule) },
  { path: '', redirectTo: '/tab-inicio', pathMatch: 'full' },
  {
    path: 'documentos',
    loadChildren: () => import('./pages/documentos/documentos.module').then( m => m.DocumentosPageModule)
  },
  {
    path: 'blanco',
    loadChildren: () => import('./pages/vistasMPE/blanco/blanco.module').then( m => m.BlancoPageModule)
  },
  {
    path: 'cambiar-password',
    loadChildren: () => import('./pages/vistasMPE/cambiar-password/cambiar-password.module').then( m => m.CambiarPasswordPageModule)
  },
  {
    path: 'notificaciones',
    loadChildren: () => import('./pages/vistasMPE/notificaciones/notificaciones.module').then( m => m.NotificacionesPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/vistasMPE/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'noticias-mas-info',
    loadChildren: () => import('./pages/vistasMPE/noticias-mas-info/noticias-mas-info.module').then( m => m.NoticiasMasInfoPageModule)
  },
  {
    path: 'tab-inicio',
    loadChildren: () => import('./pages/vistasMPE/tab-inicio/tab-inicio.module').then( m => m.TabInicioPageModule)
  },
  
  {
    path: 'contacto-mpe',
    loadChildren: () => import('./pages/vistasMPE/contacto-mpe/contacto-mpe.module').then( m => m.ContactoMpePageModule)
  },
  {
    path: 'construccion',
    loadChildren: () => import('./pages/vistasMPE/construccion/construccion.module').then( m => m.ConstruccionPageModule)
  },
  {
    path: 'modal-terminos',
    loadChildren: () => import('./pages/vistasMPE/modal-terminos/modal-terminos.module').then( m => m.ModalTerminosPageModule)
  },
  {
    path: 'construccion-menu',
    loadChildren: () => import('./pages/vistasMPE/construccion-menu/construccion-menu.module').then( m => m.ConstruccionMenuPageModule)
  },
  {
    path: 'tareas-inicio',
    loadChildren: () => import('./pages/vistasTareas/tareas-inicio/tareas-inicio.module').then( m => m.TareasInicioPageModule)
  },
  {
    path: 'incidencias',
    loadChildren: () => import('./pages/vistasTareas/incidencias/incidencias.module').then( m => m.IncidenciasPageModule)
  },
  {
    path: 'tarea-mas-info',
    loadChildren: () => import('./pages/vistasTareas/tarea-mas-info/tarea-mas-info.module').then( m => m.TareaMasInfoPageModule)
  },
  {
    path: 'firma',
    loadChildren: () => import('./pages/vistasTareas/firma/firma.module').then( m => m.FirmaPageModule)
  },
  {
    path: 'calendario',
    loadChildren: () => import('./pages/vistasMPE/calendario/calendario.module').then( m => m.CalendarioPageModule)
  },  {
    path: 'ubicaciones',
    loadChildren: () => import('./pages/ubicaciones/ubicaciones.module').then( m => m.UbicacionesPageModule)
  }





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
