import {Recommendation} from '@features/recommendations/data-access/models/recommendation.model';
import {LoadingStatus} from '@models/loading-status.type';
import {createFeature, createReducer, on} from '@ngrx/store';
import {RecommendationActions} from '@features/recommendations/data-access/+state/recommendation.actions';

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

    on(RecommendationActions.deleteRecommendation, (state, {id}) => ({
      ...state,
      recStatus: 'loading' as const,
      recommendations: state.recommendations.filter((recommendation) => recommendation.id !== id),
    })),
    on(RecommendationActions.deleteRecommendationSuccess, (state) => ({
      ...state,
      recStatus: 'loaded' as const,
    })),
    on(RecommendationActions.deleteRecommendationFailure, (state, {error}) => ({
      ...state,
      recStatus: 'error' as const,
      error,
    })),

    on(RecommendationActions.requestRecommendation, (state, {goal}) => ({
      ...state,
      recStatus: 'loading' as const,
    })),
    on(RecommendationActions.requestRecommendationSuccess, (state, {recommendation}) => ({
      ...state,
      recStatus: 'loaded' as const,
      recommendations: [...state.recommendations, recommendation],
    })),
    on(RecommendationActions.requestRecommendationFailure, (state, {error}) => ({
      ...state,
      recStatus: 'error' as const,
      error
    })),
  )
});
