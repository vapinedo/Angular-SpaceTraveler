import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(
    private router: Router,
    private authSvc: AuthService
  ) {}

  onLogout() {
    this.authSvc.logout();
    this.router.navigate(['/']);
  }
}