import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5000/api/auth';
  private currentUserMobile: string | null = null;

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  login(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, user).pipe(
      tap((response: any) => {
        if (response && response.user) {
          this.currentUserMobile = response.user.mobile;
        }
      })
    );
  }

  getUserDetails(): Observable<any> {
    if (this.currentUserMobile === null) {
      return throwError('User is not logged in');
    }

    return this.http.get(`${this.baseUrl}/user`, { params: { mobile: this.currentUserMobile } });
  }
}