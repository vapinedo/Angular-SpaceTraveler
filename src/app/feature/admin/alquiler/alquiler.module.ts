import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { AlquilerRoutingModule } from './alquiler-routing.module';

import { AlquilerAdminComponent } from './pages/admin/alquiler-admin.component';
import { AlquilerCreateComponent } from './pages/create/alquiler-create.component';
import { AlquilerDetailComponent } from './pages/detail/alquiler -detail.component';

const modules = [
  CommonModule,
  SharedModule,
  AlquilerRoutingModule
];

const components = [
  AlquilerAdminComponent,
  AlquilerCreateComponent,
  AlquilerDetailComponent,
];

@NgModule({
  declarations: [components],
  exports: [components],
  imports: [modules]
})
export class AlquilerModule { }
