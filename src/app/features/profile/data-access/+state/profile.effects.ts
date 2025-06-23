import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject} from '@angular/core';
import {ProfileActions} from '@features/profile/data-access/+state/profile.actions';
import {ApiService} from '@core/http/api.service';
import {catchError, filter, map, of, switchMap} from 'rxjs';
import {UserActivitiesEntity} from '@features/profile/data-access/+state/profile.reducer';
import {AuthFacade} from '@auth/data-access/auth.facade';

export const activitiesEffect = createEffect((
  actions$ = inject(Actions),
  apiService   = inject(ApiService),
  authFacade  = inject(AuthFacade),
) => {
  return actions$.pipe(
    ofType(ProfileActions.loadActivities),
    switchMap(() =>
      authFacade.loggedUser$.pipe(
        filter(user => user.id !== 0),
        switchMap(user => {


          return apiService.get<UserActivitiesEntity[]>(`/activities?_relations=users&user_id=${user.id}`).pipe(
            map(activities => ProfileActions.loadActivitiesSuccess({ activities })),
            catchError(error => of(ProfileActions.loadActivitiesFailure({ error })))
          )
        })
      )
    )
  );
}, { functional: true });
