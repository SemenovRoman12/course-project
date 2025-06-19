import {HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {StorageTokenService} from './storage-token.service';
import {inject} from '@angular/core';
import {catchError, throwError} from 'rxjs';

const shouldIntercept = (req: HttpRequest<any>): boolean => {
  const shouldInterceptUrls = ['auth_me', 'activities', 'recommendations'];

  for (const url of shouldInterceptUrls) {
    if(req.url.includes(url)) {
      return true;
    }
  }

  return false
}

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const storageTokenService = inject(StorageTokenService);
  const token = storageTokenService.getItem();



  if(token && shouldIntercept(req)) {
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
