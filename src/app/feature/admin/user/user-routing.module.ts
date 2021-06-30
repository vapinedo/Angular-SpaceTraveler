import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserAdminComponent } from './pages/admin/user-admin.component';
import { UserCreateComponent } from './pages/create/user-create.component';
import { UserDetailComponent } from './pages/detail/user-detail.component';
import { UserPropertyUpdateComponent } from './pages/update/user-update.component';

const routes: Routes = [
  { path: '', component: UserAdminComponent },
  { path: 'crear', component: UserCreateComponent },
  { path: 'editar/:id', component: UserPropertyUpdateComponent },
  { path: 'detalle/:id', component: UserDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class UserRoutingModule { }