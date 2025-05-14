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
  submitted = false;
  loginFailed = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.issueForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;
    this.loginFailed = false;

    if (this.issueForm.valid) {
      const { username, password } = this.issueForm.value;

      const success = this.authService.login(username, password);
      if (success) {
        this.router.navigate(['/protected']);
      } else {
        this.loginFailed = true;
      }
    }
  }
}
