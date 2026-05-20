import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthResponse } from '../models/models';
import { environment } from 'src/environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = `${environment.apiUrl}/api/auth`;
  constructor(private http: HttpClient, private router: Router) {}

  register(data: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.api}/register`, data).pipe(tap(r => this.save(r)));
  }
  login(data: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.api}/login`, data).pipe(tap(r => this.save(r)));
  }
  private save(r: AuthResponse): void {
    localStorage.setItem('token', r.token);
    localStorage.setItem('role', r.role);
    localStorage.setItem('fullName', r.fullName);
    localStorage.setItem('email', r.email);
  }
  logout(): void { localStorage.clear(); this.router.navigate(['/login']); }
  getToken(): string | null    { return localStorage.getItem('token'); }
  getRole(): string | null     { return localStorage.getItem('role'); }
  getFullName(): string | null { return localStorage.getItem('fullName'); }
  getEmail(): string | null    { return localStorage.getItem('email'); }
  isLoggedIn(): boolean        { return !!this.getToken(); }
  isAdmin(): boolean           { return this.getRole() === 'ADMIN'; }
}
