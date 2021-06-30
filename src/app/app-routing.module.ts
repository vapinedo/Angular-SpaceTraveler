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
        path: 'catalogo',
        loadChildren: () => import('@feature/admin/catalogo/catalogo.module')
        .then(m => m.CatalogoModule)
      },      
      {  
        path: 'aeronaves',
        loadChildren: () => import('@feature/admin/aeronave/aeronave.module')
        .then(m => m.AeronaveModule)
      },      
      {  
        path: 'usuarios',
        loadChildren: () => import('@feature/admin/user/user.module')
        .then(m => m.UserModule)
      }      
    ]
  },
  { path: '', redirectTo: '/admin/catalogo',  pathMatch: 'full' },
  { path: '***', redirectTo: '/admin/catalogo' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
