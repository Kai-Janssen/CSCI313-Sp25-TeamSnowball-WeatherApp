import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // flag for authentication
  private isLoggedIn = false;

  // Inject Router to allow navigation logging in/out
  constructor(private router: Router) {}

  /*
   * Mock login method that checks hardcoded credentials.
   * If successful, sets isLoggedIn to true and returns true.
   * Otherwise, returns false.
   */
  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'password') {
      this.isLoggedIn = true;
      return true;
    }
    return false;
  }

  /*
   * Logs the user out by resetting the login flag and navigating to the login page.
   */
  logout(): void {
    this.isLoggedIn = false;
    this.router.navigate(['/login']); // Redirect to login after logout
  }

  /*
   * Returns whether the user is currently authenticated.
   */
  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}