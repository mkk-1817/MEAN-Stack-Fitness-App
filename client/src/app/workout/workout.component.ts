import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit {
  userDetails: any;
  bmi: number | null = null;
  workoutPlan: any = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUserDetails().subscribe(
      (data) => {
        this.userDetails = data;
        this.calculateBMI();
        this.fetchWorkoutPlan();
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  calculateBMI(): void {
    if (this.userDetails && this.userDetails.height && this.userDetails.weight) {
      const heightInMeters = this.userDetails.height / 100;
      this.bmi = this.userDetails.weight / (heightInMeters * heightInMeters);
    } else {
      console.error('Height or weight data is missing');
    }
  }

  fetchWorkoutPlan(): void {
    if (this.bmi !== null) {
      let bmiCategory: string;
      if (this.bmi < 18.5) {
        bmiCategory = 'underweight';
      } else if (this.bmi >= 18.5 && this.bmi < 25) {
        bmiCategory = 'normal';
      } else {
        bmiCategory = 'overweight';
      }

      this.authService.getWorkoutPlan(bmiCategory).subscribe(
        (plan) => {
          this.workoutPlan = plan;
        },
        (error) => {
          console.error('Error fetching workout plan:', error);
        }
      );
    }
  }
}
