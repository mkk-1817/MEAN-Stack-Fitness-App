import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DietPlanService {
  private baseUrl = 'http://localhost:3000/api/dietPlans';

  constructor(private http: HttpClient) { }

  getDietPlan(mobileNumber: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${mobileNumber}`);
  }

  updateDietPlan(mobileNumber: string, dietPlan: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${mobileNumber}`, dietPlan);
  }
}
