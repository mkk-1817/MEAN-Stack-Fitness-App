import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user-plan',
  templateUrl: './edit-user-plan.component.html',
  styleUrls: ['./edit-user-plan.component.css']
})
export class EditUserPlanComponent implements OnInit {
  editUserDetails: any = {};
  isEditing: boolean = false;
  errorMessage: string = '';
  dietPlan: any[] = []; // Declare dietPlan property
  workoutPlan: any[] = []; // Declare workoutPlan property

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    const state = history.state as { mobile: string };
    const mobile = state?.mobile;

    if (mobile) {
      this.authService.getUserByMobile(mobile).subscribe(
        (user: any) => {
          console.log('User:', user);

          if (user) {
            this.editUserDetails = user;
            if (user.dietPlan && user.dietPlan.length > 0) {
              this.dietPlan = user.dietPlan[0].meals; // Correctly accessing nested array
            }
            if (user.workoutPlan && user.workoutPlan.length > 0) {
              this.workoutPlan = user.workoutPlan[0].exercises; // Access the exercises array
            }
          } else {
            this.errorMessage = 'No user found';
          }
        },
        (error: any) => {
          this.errorMessage = 'Error fetching user details';
          console.error(error);
        }
      );
    } else {
      this.errorMessage = 'No user mobile provided';
    }
  }

  editDetails() {
    this.isEditing = true;
  }

  saveDetails() {
    this.authService.updateUserDetails(this.editUserDetails).subscribe(
      () => {
        this.isEditing = false;
      },
      (error: any) => {
        this.errorMessage = 'Error saving user details';
        console.error(error);
      }
    );
  }

  cancelEdit() {
    this.isEditing = false;
  }
}
