import {LoadingStatus} from '@models/loading-status.type';
import {UserEntity} from '@models/user.model';
import {createFeature, createReducer, on} from '@ngrx/store';
import {ProfileActions} from '@features/profile/data-access/+state/profile.actions';

export interface UserActivitiesEntity {
  id: number;
  user: UserEntity;
  date: string;
  steps: number;
  distance: number;
  calories: number;
  heartRateAvg: number;
  heartRateMax: number;
  stressLevel: number;
  sleepQuality: number;
  activeMinutes: number;
}

export interface ProfileState {
  activities: UserActivitiesEntity[];
  profileStatus: LoadingStatus;
  error: Error | null;
}

export const profileInitialState: ProfileState = {
  activities: [] as UserActivitiesEntity[],
  profileStatus: 'init' as const,
  error: null,
};

export const profileFeature = createFeature({
  name: 'profile',
  reducer: createReducer(
    profileInitialState,
    on(ProfileActions.activities, (state) => ({
      ...state,
      profileStatus: 'loading' as const,
    })),
    on(ProfileActions.activitiesSuccess, (state, { activities }) => ({
      ...state,
      activities,
      profileStatus: 'loaded' as const,
    })),
    on(ProfileActions.activitiesFailure, (state, { error }) => ({
      ...state,
      error,
      profileStatus: 'error' as const,
    })),
  )
});
