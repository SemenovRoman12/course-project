import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject} from '@angular/core';
import {ApiService} from '../../http/api.service';
import {AuthActions} from './auth.actions';
import {catchError, concatMap, map, of, switchMap, tap, withLatestFrom} from 'rxjs';
import {RegisterResponse, RegisterUser} from '../models/sign.auth.model';
import {StorageTokenService} from '../services/storage-token.service';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {selectAuthStatus} from './auth.selectors';
import {usersEntityAdapter} from '../../utils/users-entity.adapter';
import {UserEntity} from '@models/user.model';

export const logoutEffect = createEffect(
  (
    actions$ = inject(Actions),
    storageTokenService = inject(StorageTokenService),
    router = inject(Router),
  ) => {
    return actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        storageTokenService.removeItem();
        router.navigateByUrl('');
      })
    );
  }, {functional: true, dispatch: false}
);


export const registerEffect = createEffect(
  (
    actions$ = inject(Actions),
    apiService = inject(ApiService)
  ) => {
    return actions$.pipe(
      ofType(AuthActions.register),
      map(({userData}) => usersEntityAdapter.RegisterToEntity(userData)),
      switchMap((userEntity) =>
        apiService.post<RegisterResponse, UserEntity>('/register', userEntity).pipe(
          map((response) => response.token),
          map((authToken) => AuthActions.registerSuccess({authToken})),
          catchError((error) => of(AuthActions.registerFailure(error))
        )
      )
    ));
  }, {functional: true}
);

export const registerSuccessEffect = createEffect(
  (
    actions$ = inject(Actions),
    storageTokenService = inject(StorageTokenService),
    router = inject(Router)
  ) => {
    return actions$.pipe(
      ofType(AuthActions.registerSuccess),
      concatMap(({authToken}) => {
        storageTokenService.setItem(authToken);
        router.navigateByUrl('');
        return of(AuthActions.getUser());
      })
    );
  }, {functional: true}
);

export const getUserEffect = createEffect(
  (
    actions$ = inject(Actions),
    storageTokenService = inject(StorageTokenService),
    apiService = inject(ApiService),
    store = inject(Store)
  ) => {
    return actions$.pipe(
      ofType(AuthActions.getUser),
      withLatestFrom(store.select(selectAuthStatus)),
      tap(() => console.log('test')),
      switchMap(([, authStatus]) => {
        return storageTokenService.getItem()
          ? apiService.get<RegisterUser>('/auth_me').pipe(
            map((userData: RegisterUser) => {
              const userEntity = usersEntityAdapter.RegisterToEntity(userData);
              console.log('test');
              return AuthActions.getUserSuccess({userData: userEntity});
            }),
            catchError((error) => of(AuthActions.getUserFailure(error)))
          )
          : of()
      })
    );
  }, {functional: true}
);
