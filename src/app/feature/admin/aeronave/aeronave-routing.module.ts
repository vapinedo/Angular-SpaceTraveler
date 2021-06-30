import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AeronaveAdminComponent } from './pages/admin/aeronave-admin.component';
import { AeronaveCreateComponent } from './pages/create/aeronave-create.component';
import { AeronaveDetailComponent } from './pages/detail/aeronave-detail.component';
import { AeronavePropertyUpdateComponent } from './pages/update/aeronave-update.component';

const routes: Routes = [
  { path: '', component: AeronaveAdminComponent },
  { path: 'crear', component: AeronaveCreateComponent },
  { path: 'editar/:id', component: AeronavePropertyUpdateComponent },
  { path: 'detalle/:id', component: AeronaveDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AeronaveRoutingModule { }