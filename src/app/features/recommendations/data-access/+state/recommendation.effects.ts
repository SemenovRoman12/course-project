import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject} from '@angular/core';
import {ApiService} from '@core/http/api.service';
import {RecommendationActions} from '@features/recommendations/data-access/+state/recommendation.actions';
import {catchError, filter, map, of, switchMap} from 'rxjs';
import {RecommendationResponse} from '@features/recommendations/data-access/models/recommendation.model';
import {AuthFacade} from '@auth/data-access/auth.facade';

export const loadRecommendations$ = createEffect(
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
