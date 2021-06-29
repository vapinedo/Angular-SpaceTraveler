import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { AeronaveRoutingModule } from './aeronave-routing.module';

import { AeronaveAdminComponent } from './pages/admin/aeronave-admin.component';
// import { AeronaveCreateComponent } from './pages/admin/aeronave-create.component';
// import { AeronaveDetailComponent } from './pages/detail/aeronave-detail.component';
// import { AeronaveUpdateComponent } from './pages/update/aeronave-update.component';

const modules = [
  CommonModule,
  SharedModule,
  AeronaveRoutingModule
];

const components = [
  AeronaveAdminComponent,
  // AeronaveCreateComponent,
  // AeronaveDetailComponent,
  // AeronaveUpdateComponent
];

@NgModule({
  declarations: [components],
  exports: [components],
  imports: [modules]
})
export class AeronaveModule { }
