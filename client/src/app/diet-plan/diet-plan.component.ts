import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-diet-plan',
  templateUrl: './diet-plan.component.html',
  styleUrls: ['./diet-plan.component.css']
})
export class DietPlanComponent implements OnInit {
  userDetails: any;
  bmi: number | null = null;
  dietPlan: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUserDetails().subscribe(
      (data) => {
        this.userDetails = data;
        this.calculateBMI();
        this.generateDietPlan();
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

  generateDietPlan(): void {
    if (this.bmi !== null) {
      if (this.bmi < 18.5) {
        this.dietPlan = `
          ### Underweight (BMI < 18.5)
          Diet Plan
          1. Calorie-Dense Foods: Focus on high-calorie, nutrient-rich foods like nuts, seeds, avocados, and dried fruits.
          2. Frequent Meals: Eat smaller, frequent meals throughout the day to increase calorie intake.
          3. Protein-Rich Foods: Include lean meats, dairy products, beans, and legumes to build muscle mass.
          4. Healthy Fats: Incorporate sources of healthy fats like olive oil, nuts, and fatty fish.
          5. Complex Carbohydrates: Include whole grains, starchy vegetables, and legumes to provide sustained energy.
        `;
      } else if (this.bmi >= 18.5 && this.bmi < 24.9) {
        this.dietPlan = `
          ### Normal Weight (BMI 18.5-24.9)
          #### Diet Plan
          1. Balanced Diet: Follow a balanced diet with a variety of foods from all food groups: fruits, vegetables, lean proteins, whole grains, and healthy fats.
          2. Portion Control: Practice portion control to maintain a healthy weight.
          3. Nutrient-Dense Foods: Choose nutrient-dense foods over empty calories (e.g., sugary snacks).
          4. Hydration: Drink plenty of water throughout the day.
          5. Moderation: Enjoy treats and indulgences in moderation.
        `;
      } else if (this.bmi >= 25) {
        this.dietPlan = `
          ### Overweight/Obese (BMI ≥ 25)
          #### Diet Plan
          1. Caloric Deficit: Create a caloric deficit by consuming fewer calories than you burn, focusing on a gradual and sustainable weight loss (1-2 pounds per week).
          2. High-Fiber Foods: Eat high-fiber foods like fruits, vegetables, whole grains, and legumes to promote satiety.
          3. Lean Proteins: Include lean proteins such as chicken, fish, tofu, and legumes to preserve muscle mass during weight loss.
          4. Healthy Fats: Consume healthy fats in moderation, such as those from avocados, nuts, and olive oil.
          5. Limit Processed Foods: Reduce intake of processed foods, sugary beverages, and high-fat snacks.
        `;
      }
    }
  }
}
