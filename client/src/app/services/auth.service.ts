import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5000/api/auth';
  private adminUrl = 'http://localhost:5000/api/admin';
  private currentUserMobile: string | null = null;
  private isAdminLoggedIn: boolean = false;

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user).pipe(
      catchError(this.handleError)
    );
  }

  login(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, user).pipe(
      tap((response: any) => {
        if (response && response.user) {
          this.currentUserMobile = response.user.mobile;
        }
      }),
      catchError(this.handleError)
    );
  }

  logout(): void {
    this.currentUserMobile = null;
    this.isAdminLoggedIn = false;
    // Perform any additional cleanup, such as clearing browser storage
  }

  getUserDetails(): Observable<any> {
    if (!this.currentUserMobile) {
      return throwError('User is not logged in');
    }
    return this.http.get(`${this.baseUrl}/user`, { params: { mobile: this.currentUserMobile } }).pipe(
      catchError(this.handleError)
    );
  }

  getUserByMobile(mobile: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/user`, { params: { mobile } }).pipe(
      catchError(this.handleError)
    );
  }

  updateUserDetails(user: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/user`, user).pipe(
      catchError(this.handleError)
    );
  }

  adminLogin(admin: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin-login`, admin).pipe(
      tap((response: any) => {
        if (response && response.admin) {
          this.isAdminLoggedIn = true;
        }
      }),
      catchError(this.handleError)
    );
  }

  updateUserDietPlan(userId: string, dietPlan: any): Observable<any> {
    return this.http.put(`${this.adminUrl}/user/${userId}/diet-plan`, dietPlan).pipe(
      catchError(this.handleError)
    );
  }

  updateUserWorkoutPlan(userId: string, workoutPlan: any): Observable<any> {
    return this.http.put(`${this.adminUrl}/user/${userId}/workout-plan`, workoutPlan).pipe(
      catchError(this.handleError)
    );
  }

  isAdmin(): boolean {
    return this.isAdminLoggedIn;
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.adminUrl}/users`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      errorMessage = `Server Error: ${error.status} - ${error.error.message || error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
