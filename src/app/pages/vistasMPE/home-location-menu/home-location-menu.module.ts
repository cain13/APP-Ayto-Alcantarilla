import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { HomeLocationMenuPage } from './home-location-menu.page';
import { HomeLocationMenuPageRoutingModule } from './home-location-menu-routing.module';
import { ComponentsModule } from '../../../components/components.module';

const routes: Routes = [
  {
    path: '',
    component: HomeLocationMenuPage
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeLocationMenuPageRoutingModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild(),
    ComponentsModule
  ],
  declarations: [HomeLocationMenuPage]
})
export class HomeLocationMenuPageModule {}
