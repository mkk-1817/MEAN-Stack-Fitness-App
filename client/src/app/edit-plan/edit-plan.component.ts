import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user-plan',
  templateUrl: './edit-plan.component.html',
  styleUrls: ['./edit-plan.component.css']
})
export class EditPlanComponent implements OnInit {
  editUserDetails: any = {};
  isEditing: boolean = false;
  errorMessage: string = '';
  dietPlan: string[] = [];
  workoutPlan: string[] = [];
  mobile:string|undefined;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    const state = history.state as { mobile: string };
    this.mobile = state?.mobile;
    if (this.mobile) {
      this.authService.getUserByMobile(this.mobile).subscribe(
        (user: any) => {
          console.log('User:', user);

          if (user) {
            this.editUserDetails = user;
            if (user.dietPlan && user.dietPlan.length > 0) {
              this.dietPlan = user.dietPlan[0].meals;
            }
            if (user.workoutPlan && user.workoutPlan.length > 0) {
              this.workoutPlan = user.workoutPlan[0].exercises;
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
    if (typeof this.mobile !== 'undefined')
    {this.editUserDetails.dietPlan = [{mobile:this.mobile, meals: this.dietPlan }];
    this.editUserDetails.workoutPlan = [{ mobile:this.mobile,exercises: this.workoutPlan }];

    this.authService.updateUserDietPlan(this.mobile,this.dietPlan ).subscribe(
      () => {
        this.isEditing = false;
      },
      (error: any) => {
        this.errorMessage = 'Error saving user details';
        console.error(error);
      }
    );
    this.authService.updateUserWorkoutPlan(this.mobile,this.workoutPlan ).subscribe(
      () => {
        this.isEditing = false;
      },
      (error: any) => {
        this.errorMessage = 'Error saving user details';
        console.error(error);
      }
    );
  }else {
      this.errorMessage = 'No user mobile provided';
    }
  }

  cancelEdit() {
    this.isEditing = false;
  }
}
