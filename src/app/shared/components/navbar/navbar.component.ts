import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  public isAuth: boolean = false;
  public isAdmin: boolean = false;

  constructor(
    private router: Router,
    private authSvc: AuthService
  ) {
    this.isAuth = this.authSvc.isAuth();
    this.isAdmin = this.authSvc.isAdmin();
  }

  onLogout() {
    this.authSvc.logout();
    this.router.navigate(['/auth/login']);
  }
}