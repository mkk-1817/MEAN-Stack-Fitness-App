import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string;
  mobile: string;
  age: number;
  gender: string;
  height: number;
  weight: number;
  bloodGroup: string;
  password: string;
  confirmPassword: string;

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const user = {
      name: this.name,
      mobile: this.mobile,
      age: this.age,
      gender: this.gender,
      height: this.height,
      weight: this.weight,
      bloodGroup: this.bloodGroup,
      password: this.password,
    };

    this.http.post('/api/auth/register', user)
      .subscribe(
        res => {
          console.log('Registration successful');
          this.router.navigate(['/login']);
        },
        err => {
          console.error(err);
          alert('Registration failed');
        }
      );
  }
}
