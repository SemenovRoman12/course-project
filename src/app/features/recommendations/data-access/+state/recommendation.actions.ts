import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {Recommendation} from '@features/recommendations/data-access/models/recommendation.model';

export const RecommendationActions = createActionGroup({
  source: 'recommendations',
  events: {
    'Load Recommendations': emptyProps(),
    'Load Recommendations Success': props<{ recommendations: Recommendation[] }>(),
    'Load Recommendations Failure': props<{ error: Error }>(),

    'Delete Recommendation': emptyProps(),
    'Delete Recommendation Success': emptyProps(),
    'Delete Recommendation Failure': props<{ error: Error }>(),

    'Request Recommendation': emptyProps(),
    'Request Recommendation Success': emptyProps(),
    'Request Recommendation Failure': props<{ error: Error }>(),
  },
});
