import {createActionGroup, emptyProps, props} from '@ngrx/store';
import { ReviewEntity } from '../models/reviews.model';

export const ReviewsActions = createActionGroup({
  source: "Reviews",
  events: {
    'Load Reviews': emptyProps(),
    'Load Reviews Success': props<{reviews: ReviewEntity[]}>(),
    'Load Reviews Failure': props<{error: Error}>(),
  },
});
