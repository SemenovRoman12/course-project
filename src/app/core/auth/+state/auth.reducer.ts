import {LoadingStatus} from '@models/loading-status.type';
import {createFeature, createReducer, on} from '@ngrx/store';
import {AuthActions} from './auth.actions';
import {UserEntity} from '@models/user.model';

export interface AuthState {
  authStatus: LoadingStatus,
  error: Error | null,
  authToken: string,
  loggedUser: UserEntity,
}

export const authInitialState: AuthState = {
  authStatus: "init",
  error: null,
  authToken: '',
  loggedUser: {
    id: 0,
    name: '',
    email: '',
    age: 0,
    gender: '',
    height: 0,
    weight: 0,
  },
};

export const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    authInitialState,
    on(AuthActions.register, (state, { userData }) => ({
      ...state,
      authStatus: 'loading' as const,
    })),
    on(AuthActions.registerSuccess, (state, { authToken }) => ({
      ...state,
      authToken,
      authStatus: 'loaded' as const,
    })),
    on(AuthActions.registerFailure, (state, { error }) => ({
      ...state,
      error,
    })),
    on(AuthActions.getUser, (state) => ({
      ...state,
    })),
    on(AuthActions.getUserSuccess, (state, { userData }) => ({
      ...state,
      loggedUser: userData,
      authStatus: 'loaded' as const,
    })),
    on(AuthActions.getUserFailure, (state, { error }) => ({
      ...state,
      error,
    })),
    on(AuthActions.logout, (state) => ({
      ...state,
      ...authInitialState,
    }))
  )
})
