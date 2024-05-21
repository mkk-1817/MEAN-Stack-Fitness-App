import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { DietPlanService } from '../diet-plan.service';
import { WorkoutPlanService } from '../workout-plan.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: any;
  dietPlan: any;
  workoutPlan: any;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private dietPlanService: DietPlanService,
    private workoutPlanService: WorkoutPlanService
  ) { }

  ngOnInit(): void {
    const mobileNumber = this.route.snapshot.paramMap.get('mobileNumber');
    if (mobileNumber) {
      this.userService.getUserDetails(mobileNumber).subscribe(data => {
        this.user = data;
      });
      this.dietPlanService.getDietPlan(mobileNumber).subscribe(data => {
        this.dietPlan = data;
      });
      this.workoutPlanService.getWorkoutPlan(mobileNumber).subscribe(data => {
        this.workoutPlan = data;
      });
    } else {
      // Handle the case where mobileNumber is null
      console.error('Mobile number is null');
    }
  }
}
