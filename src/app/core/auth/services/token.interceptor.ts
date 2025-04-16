import {HttpInterceptorFn} from '@angular/common/http';
import {StorageTokenService} from './storage-token.service';
import {inject} from '@angular/core';
import {catchError, throwError} from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const storageTokenService = inject(StorageTokenService);
  const token = storageTokenService.getItem();

  if(token && req.url.includes('auth_me')) {
    req = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`,
      }
    });
  }

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        console.log('test');
      }
      return throwError(() => error);
    })
  );
};
