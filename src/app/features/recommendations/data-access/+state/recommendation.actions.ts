import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {
  Recommendation,
  RecommendationRequestPayload
} from '@features/recommendations/data-access/models/recommendation.model';

export const RecommendationActions = createActionGroup({
  source: 'recommendations',
  events: {
    'Load Recommendations': emptyProps(),
    'Load Recommendations Success': props<{ recommendations: Recommendation[] }>(),
    'Load Recommendations Failure': props<{ error: Error }>(),

    'Delete Recommendation': props<{ id: number }>(),
    'Delete Recommendation Success': emptyProps(),
    'Delete Recommendation Failure': props<{ error: Error }>(),

    'Request Recommendation': props<{ goal: RecommendationRequestPayload }>(),
    'Request Recommendation Success': props<{ recommendation: Recommendation }>(),
    'Request Recommendation Failure': props<{ error: Error }>(),
  },
});
