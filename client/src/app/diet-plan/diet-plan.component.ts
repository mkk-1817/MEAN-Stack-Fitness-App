import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-diet',
  templateUrl: './diet-plan.component.html',
  styleUrls: ['./diet-plan.component.css']
})
export class DietPlanComponent implements OnInit {
  userDetails: any;
  bmi: number | null = null;
  dietPlan: any = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUserDetails().subscribe(
      (data) => {
        this.userDetails = data;
        this.calculateBMI();
        this.fetchDietPlan();
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

  fetchDietPlan(): void {
    if (this.bmi !== null) {
      let bmiCategory: string;
      if (this.bmi < 18.5) {
        bmiCategory = 'underweight';
      } else if (this.bmi >= 18.5 && this.bmi < 25) {
        bmiCategory = 'normal';
      } else {
        bmiCategory = 'overweight';
      }

      this.authService.getDietPlan(bmiCategory).subscribe(
        (plan) => {
          this.dietPlan = plan;
        },
        (error) => {
          console.error('Error fetching diet plan:', error);
        }
      );
    }
  }
}
