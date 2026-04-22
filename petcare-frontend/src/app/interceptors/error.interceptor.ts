import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Произошла ошибка. Попробуйте позже.';

      if (error.status === 401) {
        errorMessage = 'Сессия истекла. Войдите снова.';
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        router.navigate(['/login']);
      } else if (error.status === 403) {
        errorMessage = 'Доступ запрещён.';
      } else if (error.status === 404) {
        errorMessage = 'Ресурс не найден.';
      } else if (error.status === 0) {
        errorMessage = 'Не удалось подключиться к серверу. Проверьте соединение.';
      } else if (error.status >= 500) {
        errorMessage = 'Ошибка сервера. Попробуйте позже.';
      }

      console.error(`[ErrorInterceptor] HTTP ${error.status}:`, errorMessage, error);

      return throwError(() => ({ ...error, userMessage: errorMessage }));
    })
  );
};
