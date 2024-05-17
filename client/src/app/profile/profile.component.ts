import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userDetails: any;
  editUserDetails: any;
  isEditing: boolean = false;
  errorMessage: string | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUserDetails().subscribe(
      (data) => {
        this.userDetails = data;
      },
      (error) => {
        console.error(error);
        this.errorMessage = this.getErrorMessage(error);
      }
    );
  }

  editDetails(): void {
    this.isEditing = true;
    this.editUserDetails = { ...this.userDetails }; // Clone userDetails to editUserDetails
  }

  cancelEdit(): void {
    this.isEditing = false;
  }

  onSubmit(): void {
    this.authService.updateUserDetails(this.editUserDetails).subscribe(
      (data) => {
        this.userDetails = data;
        this.isEditing = false;
      },
      (error) => {
        console.error(error);
        this.errorMessage = this.getErrorMessage(error);
      }
    );
  }

  private getErrorMessage(error: any): string {
    if (error.error && typeof error.error === 'string') {
      return error.error;
    } else if (error.message) {
      return error.message;
    } else {
      return 'An unexpected error occurred';
    }
  }
}
