import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { UserRoutingModule } from './user-routing.module';

import { UserAdminComponent } from './pages/admin/user-admin.component';
import { UserCreateComponent } from './pages/create/user-create.component';
import { UserDetailComponent } from './pages/detail/user-detail.component';
import { UserPropertyUpdateComponent } from './pages/update/user-update.component';

const modules = [
  CommonModule,
  SharedModule,
  UserRoutingModule
];

const components = [
  UserAdminComponent,
  UserCreateComponent,
  UserDetailComponent,
  UserPropertyUpdateComponent
];

@NgModule({
  declarations: [components],
  exports: [components],
  imports: [modules]
})
export class UserModule { }
