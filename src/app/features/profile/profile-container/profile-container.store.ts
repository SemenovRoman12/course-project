import {inject, Injectable} from '@angular/core';
import {UserEntity} from '@models/user.model';
import {ComponentStore} from '@ngrx/component-store';
import {LoadingStatus} from '@models/loading-status.type';
import {catchError, filter, of, switchMap, tap, withLatestFrom} from 'rxjs';
import {ApiService} from '@core/http/api.service';
import {AuthFacade} from '@auth/auth.facade';

export interface UserActivitiesEntity {
  id: number;
  user: UserEntity;
  date: string;         // ISO date string
  steps: number;
  distance: number;     // км
  calories: number;
  heartRateAvg: number;
  heartRateMax: number;
  stressLevel: number;
  sleepQuality: number; // в %
  activeMinutes: number;
}

export interface UserActivitiesState {
  activities: UserActivitiesEntity[];
  activitiesStatus: LoadingStatus;
  error: Error | null;
}

@Injectable()
export class ProfileContainerStoreService extends ComponentStore<UserActivitiesState>{

  private readonly apiService = inject(ApiService);
  private readonly authFacade = inject(AuthFacade);

  user$ = this.authFacade.loggedUser$;

  constructor() {
    super({
      activities: [],
      activitiesStatus: 'init',
      error: null,
    })
  }

  public readonly setActivities = this.updater<UserActivitiesEntity[]>((state, activities) => ({
    ...state,
    activities,
  }));

  public readonly setStatus = this.updater<LoadingStatus>((state,  activitiesStatus) => ({
    ...state,
    activitiesStatus,
  }));

  public readonly setError = this.updater<Error>((state, error) => ({
    ...state,
    error,
  }));

  public readonly loadActivities = this.effect(
    (trigger$) => trigger$.pipe(
      tap(() => this.setStatus('loading' as const)),
      withLatestFrom(this.user$),
      switchMap(([, user]) =>
        this.apiService.get<UserActivitiesEntity[]>(`/activities?_relations=users&user_id=${user.id}`).pipe(
          tap((activities) => {
            this.setActivities(activities);
            this.setStatus('loaded' as const);
          }),
          catchError((error: Error) => {
            this.setError(error);
            this.setStatus('error' as const);
            return of();
          })
        )
      )
    )
  )
}
