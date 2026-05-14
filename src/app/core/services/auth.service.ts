import { Injectable, computed, inject, signal } from '@angular/core';
import { MokkatAPIService } from './mokkat-api.service';
import { AuthResponse, LoginRequest } from '../models/Auth.model';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { UserInfo } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = inject(MokkatAPIService);
  private router = inject(Router);

  private readonly TOKEN_KEY = 'mokatta_jwt_token';
  private readonly USER_KEY = 'mokatta_user';

  // STATE
  private _token = signal<string | null>(
    localStorage.getItem(this.TOKEN_KEY)
  );

  private _user = signal<UserInfo | null>(
    this.loadUser()
  );

  // PUBLIC
  token = this._token.asReadonly();

  user = this._user.asReadonly();

  isAuthenticated = computed(() => !!this._token());

  login(credentials: LoginRequest) {

    return this.api.post<AuthResponse>('auth/login', credentials).pipe(

      tap((response) => {

        localStorage.setItem(
          this.TOKEN_KEY,
          response.accessToken
        );

        localStorage.setItem(
          this.USER_KEY,
          JSON.stringify(response.user)
        );

        this._token.set(response.accessToken);

        this._user.set(response.user);

      })

    );

  }

  logout() {

    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);

    this._token.set(null);
    this._user.set(null);

    this.router.navigate(['/login']);

  }

  getToken(): string | null {
    return this._token();
  }

  private loadUser(): UserInfo | null {

    const user = localStorage.getItem(this.USER_KEY);

    if (!user) return null;

    try {
      return JSON.parse(user);
    } catch {
      return null;
    }

  }

}