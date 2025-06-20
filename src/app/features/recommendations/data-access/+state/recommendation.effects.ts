import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject} from '@angular/core';
import {ApiService} from '@core/http/api.service';
import {RecommendationActions} from '@features/recommendations/data-access/+state/recommendation.actions';
import {catchError, filter, map, of, switchMap, tap} from 'rxjs';
import {RecommendationResponse} from '@features/recommendations/data-access/models/recommendation.model';
import {AuthFacade} from '@auth/data-access/auth.facade';

export const loadRecommendationsEffect$ = createEffect(
  (
    actions$ = inject(Actions),
    apiService = inject(ApiService),
    authFacade  = inject(AuthFacade),
  ) => {
    return actions$.pipe(
      ofType(RecommendationActions.loadRecommendations),
      switchMap(() =>
        authFacade.loggedUser$.pipe(
          filter(user => user.id !== 0),
          switchMap(() => {
            return apiService.get<RecommendationResponse>('/recommendations?_relations=users').pipe(
              map((recommendations) => RecommendationActions.loadRecommendationsSuccess({recommendations})),
              catchError((error) => of(RecommendationActions.loadRecommendationsFailure({error})))
            );
          })
        )
      )
    );
  }, {functional: true}
);

export const deleteRecommendationEffect$ = createEffect(
  (
    actions$ = inject(Actions),
    apiService = inject(ApiService),
    authFacade  = inject(AuthFacade),
  ) => {
    return actions$.pipe(
      ofType(RecommendationActions.deleteRecommendation),
      switchMap(({id}) => {
        console.log(id)
        return apiService.delete<any>(`/recommendations/${id}`).pipe(
          tap((res) => console.log(res)),
          map(() => RecommendationActions.deleteRecommendationSuccess()),
          catchError((error) => of(RecommendationActions.deleteRecommendationFailure({error}))),
        );
      })
    );
  }, {functional: true}
);
