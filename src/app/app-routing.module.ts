import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from '@feature/admin/admin.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('@feature/auth/auth.module')
    .then(m => m.AuthModule)
  },
  {  
    path: 'admin',
    component:  AdminComponent,
    children: [
      {  
        path: 'aeronaves',
        loadChildren: () => import('@feature/admin/aeronave/aeronave.module')
        .then(m => m.AeronaveModule)
      }      
    ]
  },
  { path: '', redirectTo: '/auth/login',  pathMatch: 'full' },
  { path: '***', redirectTo: '/auth/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
