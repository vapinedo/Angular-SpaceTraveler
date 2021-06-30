import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
    private router: Router,
    private authSvc: AuthService
  ) { }

  canActivate() {
    const user = this.authSvc.getCurrentUser();
    const rol = user?.rol;

    if (rol === 'Admin') {
      return true;
    } 
    this.router.navigate(['/catalogo']);
    return false;
  }

}
