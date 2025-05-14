import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../admin/authService.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  issueForm: FormGroup;
  // Flags for form submission and login failure
  submitted = false;
  loginFailed = false;

  // Inject FormBuilder, AuthService, and Router
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Initialize the form with form controls and validation rules
    this.issueForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  
  onSubmit() {
    // Mark the form as submitted
    this.submitted = true;
    // Reset the login failure flag
    this.loginFailed = false;

    // Proceed only if form is valid
    if (this.issueForm.valid) {
      const { username, password } = this.issueForm.value;

      // Attempt login using AuthService
      const success = this.authService.login(username, password);
      if (success) {
        // Navigate to the protected route on successful login
        this.router.navigate(['/protected']);
      } else {
        // Set failure flag to display error message
        this.loginFailed = true;
      }
    }
  }
}