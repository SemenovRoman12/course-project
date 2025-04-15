import {authFeature} from './auth.reducer';
import {createSelector} from '@ngrx/store';
import {LoadingStatus} from '@models/loading-status.type';

export const { selectAuthStatus } = authFeature;

export const selectIsAuthenticated = createSelector(
  selectAuthStatus,
  (loadingStatus: LoadingStatus) => loadingStatus === 'loaded'
);
