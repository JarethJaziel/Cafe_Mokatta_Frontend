import { Injectable, inject, signal } from '@angular/core';
import { MokkatAPIService } from './mokkat-api.service';
import { AuthResponse, LoginRequest } from '../models/Auth.model';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = inject(MokkatAPIService);
  private router = inject(Router);

  private readonly TOKEN_KEY = 'mokatta_jwt_token';

  // Signal para manejar el estado reactivo de la autenticación
  isAuthenticated = signal<boolean>(this.hasToken());

  login(credentials: LoginRequest) {
    return this.api.post<AuthResponse>('auth/login', credentials).pipe(
      tap(response => {
        if (response && response.accessToken) {
          localStorage.setItem(this.TOKEN_KEY, response.accessToken);
          this.isAuthenticated.set(true);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }
}
