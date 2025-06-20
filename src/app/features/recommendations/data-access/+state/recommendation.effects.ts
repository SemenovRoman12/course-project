import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject} from '@angular/core';
import {ApiService} from '@core/http/api.service';
import {RecommendationActions} from '@features/recommendations/data-access/+state/recommendation.actions';
import {catchError, filter, map, of, switchMap, tap, withLatestFrom} from 'rxjs';
import {
  GeminiRequestBody,
  PromptToGemini,
  RecommendationGeminiResponse,
  RecommendationRequestPayload,
  RecommendationResponse, RecommendationVM,
} from '@features/recommendations/data-access/models/recommendation.model';
import {AuthFacade} from '@auth/data-access/auth.facade';
import {GeminiService} from '@features/recommendations/services/gemini.service';
import {Store} from '@ngrx/store';
import {selectLoggedUser} from '@auth/data-access/+state/auth.selectors';
import {geminiAdapter} from '@features/recommendations/utils/request-gemini.adapter';
import {selectActivities} from '@features/profile/data-access/+state/profile.selectors';
import {formatDate} from '@features/recommendations/utils/date-transform';

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
          switchMap(({id}) => {
            return apiService.get<RecommendationResponse>(`/recommendations?_relations=users&user_id=${id}`).pipe(
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

export const requestRecommendationEffect$ = createEffect(
  (
    actions$ = inject(Actions),
    apiService = inject(ApiService),
    geminiService = inject(GeminiService),
    store = inject(Store),
  ) => {
    return actions$.pipe(
      ofType(RecommendationActions.requestRecommendation),
      withLatestFrom(store.select(selectLoggedUser), store.select(selectActivities)),
      switchMap(([{ goal }, userData, userActivities]) => {
        const prompt = geminiAdapter.requestGeminiAdapter( goal, userData, userActivities);
        const body = geminiAdapter.bodyGeminiAdapter(prompt);


        return geminiService.post<RecommendationGeminiResponse, GeminiRequestBody>(body).pipe(
          map((recommendation) => geminiAdapter.responseGeminiToRequestAdapter(recommendation)),
          switchMap((data) => {
            return apiService.post<any, RecommendationVM>('/recommendations', data).pipe(
              tap((recommendation) => console.log(recommendation)),
              map((recommendation) => RecommendationActions.requestRecommendationSuccess(recommendation)),
              catchError((error) => of(RecommendationActions.deleteRecommendationFailure({error})))
            );
          })
        );
      })
    );
  },
  { functional: true }
);
