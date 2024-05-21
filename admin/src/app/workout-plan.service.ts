import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkoutPlanService {
  private baseUrl = 'http://localhost:3000/api/workoutPlans';

  constructor(private http: HttpClient) { }

  getWorkoutPlan(mobileNumber: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${mobileNumber}`);
  }

  updateWorkoutPlan(mobileNumber: string, workoutPlan: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${mobileNumber}`, workoutPlan);
  }
}
