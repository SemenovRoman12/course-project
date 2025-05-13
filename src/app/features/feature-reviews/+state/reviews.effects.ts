import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject} from '@angular/core';
import {ApiService} from '@core/http/api.service';
import {ReviewsActions} from './reviews.actions';
import {catchError, map, of, switchMap} from 'rxjs';
import {ReviewEntity} from '../models/reviews.model';

export const loadReviewsEffect = createEffect(
  (
    actions$ = inject(Actions),
    apiService = inject(ApiService),
  ) => {
    return actions$.pipe(
      ofType(ReviewsActions.loadReviews),
      switchMap(() => {
        return apiService.get<ReviewEntity[]>('/reviews').pipe(
          map((reviews) => ReviewsActions.loadReviewsSuccess({reviews})),
          catchError((error) => of(ReviewsActions.loadReviewsFailure({error})))
        )
      })
    );
  }, {functional: true}
);
