import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const localStorageService = inject(LocalStorageService);
  const token = localStorageService.get('token');

  if (token && isTokenExpired(token)) {
    localStorageService.remove('token');
  }

  const reqWithHeader = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });

  return next(reqWithHeader);
};

function isTokenExpired(token: string): boolean {
  const tokenData = JSON.parse(atob(token.split('.')[1]));
  const expirationDate = new Date(tokenData.exp * 1000);
  return expirationDate <= new Date();
}
