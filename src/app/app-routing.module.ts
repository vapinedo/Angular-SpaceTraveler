import { NgModule } from '@angular/core';
import { AuthGuard } from '@core/guards/auth.guard';
import { AdminGuard } from '@core/guards/admin.guard';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from '@feature/admin/admin.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('@feature/auth/auth.module')
    .then(m => m.AuthModule)
  },
  {  
    path: 'catalogo',
    loadChildren: () => import('@feature/catalogo/catalogo.module').then(m => m.CatalogoModule)
  },      
  {  
    path: 'admin',
    component:  AdminComponent,
    children: [
      {  
        path: 'aeronaves',
        canActivate: [ AuthGuard, AdminGuard ],
        loadChildren: () => import('@feature/admin/aeronave/aeronave.module').then(m => m.AeronaveModule)
      },      
      {  
        path: 'alquileres',
        canActivate: [ AuthGuard ],
        loadChildren: () => import('@feature/admin/alquiler/alquiler.module').then(m => m.AlquilerModule)
      },      
      {  
        path: 'usuarios',
        canActivate: [ AuthGuard, AdminGuard ],
        loadChildren: () => import('@feature/admin/user/user.module').then(m => m.UserModule)
      }      
    ]
  },
  { path: '', redirectTo: '/catalogo',  pathMatch: 'full' },
  { path: '***', redirectTo: '/catalogo' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
