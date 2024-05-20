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
  dietPlan: string[] = []; // Declare dietPlan as an array of strings

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUserDetails().subscribe(
      (data) => {
        console.log('User Details:', data); // Debugging line
        this.userDetails = data;
        this.calculateBMI();
        if (data.dietPlan && data.dietPlan.length > 0) {
          this.dietPlan = data.dietPlan[0].meals; // Correctly accessing nested array
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
