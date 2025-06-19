import {Recommendation} from '@features/recommendations/data-access/models/recommendation.model';
import {LoadingStatus} from '@models/loading-status.type';
import {createFeature, createReducer, on} from '@ngrx/store';
import {R} from '@angular/cdk/keycodes';
import {RecommendationActions} from '@features/recommendations/data-access/+state/recommendation.actions';
import {state} from '@angular/animations';

export interface RecommendationState {
  recommendations: Recommendation[];
  recStatus: LoadingStatus;
  error: Error | null;
}

export const recommendationInitialState: RecommendationState = {
  recommendations: [],
  recStatus: 'init',
  error: null,
};

export const recommendationFeature = createFeature({
  name: 'recommendation',
  reducer: createReducer(
    recommendationInitialState,
    on(RecommendationActions.loadRecommendations, (state) => ({
      ...state,
      recStatus: 'loading' as const,
    })),
    on(RecommendationActions.loadRecommendationsSuccess, (state, {recommendations}) => ({
      ...state,
      recStatus: 'loaded' as const,
      recommendations,
    })),
    on(RecommendationActions.loadRecommendationsFailure, (state, {error}) => ({
      ...state,
      recStatus: 'error' as const,
      error,
    })),


  )
});
