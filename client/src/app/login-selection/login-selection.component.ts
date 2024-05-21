import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-selection',
  templateUrl: './login-selection.component.html',
  styleUrls: ['./login-selection.component.css']
})
export class LoginSelectionComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  redirectToUserLogin() {
    this.router.navigate(['/login']); // Navigate to the user login page
  }

  redirectToAdminLogin() {
    this.router.navigate(['/admin-login']); // Navigate to the admin login page
  }
}
