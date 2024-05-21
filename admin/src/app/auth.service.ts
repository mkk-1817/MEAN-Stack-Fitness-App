import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin') {
      this.isAuthenticated = true;
      localStorage.setItem('loggedIn', 'true');
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('loggedIn');
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated || localStorage.getItem('loggedIn') === 'true';
  }
}
