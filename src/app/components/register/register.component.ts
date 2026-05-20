import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({ selector: 'app-register', templateUrl: './register.component.html' })
export class RegisterComponent {
  form: FormGroup;
  errorMsg = '';
  loading  = false;
  showPass = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email:    ['', [Validators.required, Validators.email]],
      phone:    ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading = true; this.errorMsg = '';
    this.auth.register(this.form.value).subscribe({
      next: () => this.router.navigate(['/home']),
      error: (err) => { this.errorMsg = err.error?.message || 'Registration failed.'; this.loading = false; }
    });
  }

  get f() { return this.form.controls; }
}
