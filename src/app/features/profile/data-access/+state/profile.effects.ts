import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject} from '@angular/core';
import {ProfileActions} from '@features/profile/data-access/+state/profile.actions';
import {ApiService} from '@core/http/api.service';
import {catchError, filter, map, of, switchMap} from 'rxjs';
import {UserActivitiesEntity} from '@features/profile/data-access/+state/profile.reducer';
import {AuthFacade} from '@auth/auth.facade';

export const activitiesEffect = createEffect((
  actions$ = inject(Actions),
  apiService   = inject(ApiService),
  auth  = inject(AuthFacade),
) => {
  return actions$.pipe(
    ofType(ProfileActions.activities),
    switchMap(() =>
      auth.loggedUser$.pipe(
        filter(user => user.id !== 0),
        switchMap(user =>
          apiService.get<UserActivitiesEntity[]>(`/activities?_relations=users&user_id=${user.id}`).pipe(
            map(activities => ProfileActions.activitiesSuccess({ activities })),
            catchError(error => of(ProfileActions.activitiesFailure({ error })))
          )
        )
      )
    )
  );
}, { functional: true });
