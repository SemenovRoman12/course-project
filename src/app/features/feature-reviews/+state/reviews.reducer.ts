import {ReviewEntity} from '../models/reviews.model';
import {createFeature, createReducer, on} from '@ngrx/store';
import {ReviewsActions} from './reviews.actions';
import {LoadingStatus} from '@models/loading-status.type';

export interface ReviewsState {
  reviews: ReviewEntity[],
  error: Error | null,
  reviewsStatus: LoadingStatus,
}

export const reviewsInitialState: ReviewsState = {
  reviews: [],
  error: null,
  reviewsStatus: 'init'
}

export const reviewsFeature = createFeature({
  name: 'Reviews',
  reducer: createReducer(
    reviewsInitialState,
    on(ReviewsActions.loadReviews, (state) => ({
      ...state,
      reviewsStatus: 'loading' as const,
    })),
    on(ReviewsActions.loadReviewsSuccess, (state, {reviews}) => ({
      ...state,
      reviews,
      reviewsStatus: 'loaded' as const,
    })),
    on(ReviewsActions.loadReviewsFailure, (state, {error}) => ({
      ...state,
      error,
      reviewsStatus: 'error' as const,
    }))
  )
});
