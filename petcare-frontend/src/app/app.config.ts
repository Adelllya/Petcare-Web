import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';
import { errorInterceptor } from './interceptors/error.interceptor';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    // auth.interceptor → добавляет JWT Bearer token к каждому запросу
    // error.interceptor → глобально обрабатывает HTTP-ошибки (401/403/404/500)
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor]))
  ]
};
