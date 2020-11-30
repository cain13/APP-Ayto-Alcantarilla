import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule, Routes } from '@angular/router';
import { PopoverAvisarEditPerfilComponent } from './popover-avisar-edit-perfil/popover-avisar-edit-perfil.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: HeaderComponent
  }
];

@NgModule({
  declarations: [
    HeaderComponent,
    PopoverAvisarEditPerfilComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule.forChild(),
    RouterModule,
    FormsModule,

  ],
  exports: [
    HeaderComponent,
    PopoverAvisarEditPerfilComponent
  ],

})
export class ComponentsModule { }
