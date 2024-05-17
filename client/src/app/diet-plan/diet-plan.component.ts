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

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUserDetails().subscribe(
      (data) => {
        this.userDetails = data;
        this.calculateBMI();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  calculateBMI(): void {
    if (this.userDetails) {
      const heightInMeters = this.userDetails.height / 100;
      this.bmi = this.userDetails.weight / (heightInMeters * heightInMeters);
    }
  }
}