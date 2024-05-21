import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    // Assuming default admin credentials are provided in the AuthService
    this.authService.adminLogin({ username: 'admin', password: 'adminpass' }).subscribe(
      (response: any) => {
        this.router.navigate(['/admin-dashboard']);
      },
      (error: any) => {
        this.errorMessage = 'Invalid credentials';
      }
    );
  }
}
