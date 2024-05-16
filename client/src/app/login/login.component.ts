import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  mobile: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const user = {
      mobile: this.mobile,
      password: this.password,
    };

    this.authService.login(user).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error(error);
        alert('Login failed: ' + (error.error.msg || 'Unknown error'));
      }
    );
  }
}
