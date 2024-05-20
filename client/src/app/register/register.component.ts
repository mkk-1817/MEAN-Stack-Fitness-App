import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  mobile: string = '';
  age: string = '';
  gender: string = '';
  height: string = '';
  weight: string = '';
  bloodGroup: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onGenderChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.gender = target.value;
  }

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const defaultDietPlan = {
      // Define your default diet plan here
      meals: [
        { meal: 'Breakfast', items: ['Oatmeal', 'Fruit'] },
        { meal: 'Lunch', items: ['Grilled Chicken', 'Salad'] },
        { meal: 'Dinner', items: ['Fish', 'Vegetables'] }
      ]
    };

    const defaultWorkoutPlan = {
      // Define your default workout plan here
      workouts: [
        { day: 'Monday', exercises: ['Push-ups', 'Squats'] },
        { day: 'Wednesday', exercises: ['Pull-ups', 'Lunges'] },
        { day: 'Friday', exercises: ['Plank', 'Deadlifts'] }
      ]
    };

    const user = {
      name: this.name,
      mobile: this.mobile,
      age: this.age,
      gender: this.gender,
      height: this.height,
      weight: this.weight,
      bloodGroup: this.bloodGroup,
      password: this.password,
      dietPlan: defaultDietPlan,
      workoutPlan: defaultWorkoutPlan
    };

    this.http.post('http://localhost:5000/api/auth/register', user).subscribe(
      res => {
        console.log('Registration successful');
        this.router.navigate(['/login']);
      },
      err => {
        console.error(err);
        alert(`Registration failed: ${err.error.msg || 'Unknown error'}`);
      }
    );
  }
}
