import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlquilerAdminComponent } from './pages/admin/alquiler-admin.component';
import { AlquilerCreateComponent } from './pages/create/alquiler-create.component';
import { AlquilerDetailComponent } from './pages/detail/alquiler -detail.component';

const routes: Routes = [
  { path: '', component: AlquilerAdminComponent },
  { path: 'crear/:naveID', component: AlquilerCreateComponent },
  { path: 'detalle/:id', component: AlquilerDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AlquilerRoutingModule { }