import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DietPlanService } from '../diet-plan.service';

@Component({
  selector: 'app-edit-diet-plan',
  templateUrl: './edit-diet-plan.component.html',
  styleUrls: ['./edit-diet-plan.component.css']
})
export class EditDietPlanComponent implements OnInit {
  dietPlan: any = {};

  constructor(
    private route: ActivatedRoute,
    private dietPlanService: DietPlanService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const mobileNumber = this.route.snapshot.paramMap.get('mobileNumber');
    if (mobileNumber) {
      this.dietPlanService.getDietPlan(mobileNumber).subscribe(data => {
        this.dietPlan = data;
      });
    } else {
      // Handle the case where mobileNumber is null
      console.error('Mobile number is null');
    }
  }

  save(): void {
    const mobileNumber = this.route.snapshot.paramMap.get('mobileNumber');
    if (mobileNumber) {
      this.dietPlanService.updateDietPlan(mobileNumber, this.dietPlan).subscribe(() => {
        this.router.navigate(['/user', mobileNumber]);
      });
    } else {
      // Handle the case where mobileNumber is null
      console.error('Mobile number is null');
    }
  }
}
