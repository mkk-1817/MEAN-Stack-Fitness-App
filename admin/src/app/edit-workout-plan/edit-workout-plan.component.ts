import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkoutPlanService } from '../workout-plan.service';

@Component({
  selector: 'app-edit-workout-plan',
  templateUrl: './edit-workout-plan.component.html',
  styleUrls: ['./edit-workout-plan.component.css']
})
export class EditWorkoutPlanComponent implements OnInit {
  workoutPlan: any = {};

  constructor(
    private route: ActivatedRoute,
    private workoutPlanService: WorkoutPlanService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const mobileNumber = this.route.snapshot.paramMap.get('mobileNumber');
    if (mobileNumber) {
      this.workoutPlanService.getWorkoutPlan(mobileNumber).subscribe(data => {
        this.workoutPlan = data;
      });
    } else {
      // Handle the case where mobileNumber is null
      console.error('Mobile number is null');
    }
  }

  save(): void {
    const mobileNumber = this.route.snapshot.paramMap.get('mobileNumber');
    if (mobileNumber) {
      this.workoutPlanService.updateWorkoutPlan(mobileNumber, this.workoutPlan).subscribe(() => {
        this.router.navigate(['/user', mobileNumber]);
      });
    } else {
      // Handle the case where mobileNumber is null
      console.error('Mobile number is null');
    }
  }
}
