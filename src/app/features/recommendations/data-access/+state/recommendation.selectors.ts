import {recommendationFeature} from '@features/recommendations/data-access/+state/recommendation.reducer';
import {createSelector} from '@ngrx/store';

export const { selectRecommendations, selectRecStatus } = recommendationFeature

export const selectRecommendationsSorted = createSelector(
  selectRecommendations,
  (recommendations) => [...recommendations].sort((a, b) => b.id - a.id)
);
