import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({ selector: 'app-login', templateUrl: './login.component.html' })
export class LoginComponent {
  form: FormGroup;
  errorMsg = '';
  loading  = false;
  showPass = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    if (this.auth.isLoggedIn()) {
      this.router.navigate([this.auth.isAdmin() ? '/admin' : '/home']);
    }
    this.form = this.fb.group({
      email:    ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading = true; this.errorMsg = '';
    this.auth.login(this.form.value).subscribe({
      next: (res) => this.router.navigate([res.role === 'ADMIN' ? '/admin' : '/home']),
      error: ()   => { this.errorMsg = 'Invalid email or password.'; this.loading = false; }
    });
  }

  get f() { return this.form.controls; }
}
