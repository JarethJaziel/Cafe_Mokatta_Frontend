import {
  HttpErrorResponse,
  HttpInterceptorFn
} from '@angular/common/http';

import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { catchError, throwError } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const alertService = inject(AlertService);
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();

  let clonedReq = req;

  // Agregar token
  if (token) {

    clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

  }

  return next(clonedReq).pipe(

    catchError((error: HttpErrorResponse) => {

      // Token inválido o expirado
      if (error.status === 401 || error.status === 403) {

        authService.logout();

        alertService.error('Error', 'Your session expired, please login again.');
        router.navigate(['/login']);

      }

      return throwError(() => error);

    })

  );

};