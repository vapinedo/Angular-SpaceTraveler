import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authSvc: AuthService
  ) { }

  canActivate() {
    const user = this.authSvc.getCurrentUser();

    if (user) { return true; }
    this.router.navigate(['/auth/login']);
    return false;
  }
}
