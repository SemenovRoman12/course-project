import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject} from '@angular/core';
import {ApiService} from '../../http/api.service';
import {AuthActions} from './auth.actions';
import {catchError, map, of, switchMap, tap, withLatestFrom} from 'rxjs';
import {
  SignAuthResponse,
  SignAuthRequest,
  SignAuthUser,
  ChangeProfileDataPayload,
  ChangeProfileDataResponse
} from '../models/sign.auth.model';
import {StorageTokenService} from '../services/storage-token.service';
import {Router} from '@angular/router';
import {userAuthRequestAdapter} from '@utils/auth/user-auth-request.adapter';
import {UserEntity} from '@models/user.model';
import {AuthFacade} from '@auth/auth.facade';
import {Store} from '@ngrx/store';
import {selectLoggedUser} from '@auth/+state/auth.selectors';

export const registerEffect$ = createEffect(
  (
    actions$ = inject(Actions),
    apiService = inject(ApiService)
  ) => {
    return actions$.pipe(
      ofType(AuthActions.register),
      switchMap(({userData}) => {
        const userDataRequest = userAuthRequestAdapter.AuthToRequest(userData);
        return apiService.post<SignAuthResponse, SignAuthRequest>('/register', userDataRequest).pipe(
          map((res) => AuthActions.registerSuccess({res})),
          catchError((error) => of(AuthActions.registerFailure(error)))
        )
      }
    ));
  }, {functional: true}
);

export const registerSuccessEffect$ = createEffect(
  (
    actions$ = inject(Actions),
    storageTokenService = inject(StorageTokenService),
    router = inject(Router)
  ) => {
    return actions$.pipe(
      ofType(AuthActions.registerSuccess),
      tap(({res}) => {
        storageTokenService.setItem(res.token);
        router.navigateByUrl('');
      })
    );
  }, {functional: true, dispatch: false}
);

export const loginEffect$ = createEffect(
  (
    actions$ = inject(Actions),
    apiService = inject(ApiService),
  ) => {
    return actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ userData }) => {
        return apiService.post<SignAuthResponse, SignAuthUser>('/auth', userData).pipe(
          map((res) => AuthActions.loginSuccess({res})),
          catchError((error) => of(AuthActions.loginFailure(error)))
        )
      })
    );
  }, {functional: true}
);

export const loginSuccessEffect$ = createEffect(
  (
    actions$ = inject(Actions),
    storageTokenService = inject(StorageTokenService),
    router = inject(Router)
  ) => {
    return actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(({res}) => {
        storageTokenService.setItem(res.token);
        router.navigateByUrl('');
      })
    );
  }, {functional: true, dispatch: false}
);

export const getUserEffect$ = createEffect(
  (
    actions$ = inject(Actions),
    storageTokenService = inject(StorageTokenService),
    apiService = inject(ApiService),
  ) => {
    return actions$.pipe(
      ofType(AuthActions.getUser),
      switchMap(() => {
        return storageTokenService.getItem()
          ? apiService.get<UserEntity>('/auth_me').pipe(
            map((userData: UserEntity) => AuthActions.getUserSuccess({userData})),
            catchError((error) => of(AuthActions.getUserFailure(error)))
          )
          : of()
      })
    );
  }, {functional: true}
);

export const logoutEffect$ = createEffect(
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



export const changerProfileEffect$ = createEffect(
  (
    actions$ = inject(Actions),
    apiService = inject(ApiService),
    store = inject(Store),
  ) => {
    return actions$.pipe(
      ofType(AuthActions.changeProfileData),
      withLatestFrom(store.select(selectLoggedUser)),
      switchMap(([{data}, user]) => {
        return apiService.patch<ChangeProfileDataResponse, ChangeProfileDataPayload>(`/users/${user.id}`, data).pipe(
          map(response => AuthActions.changeProfileDataSuccess({ res: response })),
          catchError(error => of(AuthActions.changeProfileDataFailure({ error })))
        );
      })
    );
  }, { functional: true }
);
