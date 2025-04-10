import {User} from '@models/user.model';
import {LoadingStatus} from '@models/loading-status.type';
import {createFeature, createReducer} from '@ngrx/store';

export interface AuthState {
  authStatus: LoadingStatus,
  error: string | null,
  authToken: string,
  loggedUser: User | null,
}

export const authInitialState: AuthState = {
  authStatus: "init",
  error: null,
  authToken: '',
  loggedUser: null,
};

export const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    authInitialState,
  )
})
