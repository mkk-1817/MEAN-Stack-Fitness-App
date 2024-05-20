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
  workoutPlan: string[] = []; // Declare workoutPlan as an array of strings

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUserDetails().subscribe(
      (data) => {
        console.log('User Details:', data); // Debugging line
        this.userDetails = data;
        this.calculateBMI();
        if (data.workoutPlan && data.workoutPlan.length > 0) {
          this.workoutPlan = data.workoutPlan[0].exercises; // Access the exercises array
        }
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
}
