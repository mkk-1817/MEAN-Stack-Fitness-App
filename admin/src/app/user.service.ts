import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  getUserDetails(mobileNumber: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${mobileNumber}`);
  }
}
