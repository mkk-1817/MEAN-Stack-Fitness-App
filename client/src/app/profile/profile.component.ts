import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userDetails: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Fetch user details after login
    this.authService.getUserDetails().subscribe(
      (data) => {
        this.userDetails = data;
      },
      (error) => {
        console.error(error);
        // Handle error
      }
    );
  }
}
