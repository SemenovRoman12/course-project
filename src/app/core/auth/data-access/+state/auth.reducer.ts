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
    on(AuthActions.registerSuccess, (state, { res }) => ({
      ...state,
      authToken: res.token,
      loggedUser: res.data,
      authStatus: 'loaded' as const,
    })),
    on(AuthActions.registerFailure, (state, { error }) => ({
      ...state,
      error,
    })),


    on(AuthActions.login, (state, { userData }) => ({
      ...state,
      authStatus: 'loading' as const,
    })),
    on(AuthActions.loginSuccess, (state, { res }) => ({
      ...state,
      authToken: res.token,
      loggedUser: res.data,
      authStatus: 'loaded' as const,
    })),
    on(AuthActions.loginFailure, (state, { error }) => ({
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

    on(AuthActions.changeProfileData, (state) => ({
      ...state,
      authStatus: 'loading' as const,
    })),
    on(AuthActions.changeProfileDataSuccess, (state, {newUserData}) => ({
      ...state,
      authStatus: 'loaded' as const,
      loggedUser: newUserData,
    })),
    on(AuthActions.changeProfileDataFailure, (state, {error}) => ({
      ...state,
      authStatus: 'error' as const,
      error,
    })),

    on(AuthActions.logout, (state) => ({
      ...state,
      ...authInitialState,
    })),
  )
})
