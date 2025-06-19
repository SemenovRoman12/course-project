import {inject, Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {RecommendationActions} from '@features/recommendations/data-access/+state/recommendation.actions';
import {selectReviewsStatus} from '@features/reviews/+state/reviews.selectors';
import {selectRecommendations} from '@features/recommendations/data-access/+state/recommendation.selectors';

@Injectable({
  providedIn: 'root'
})
export class RecommendationFacadeService {
  private readonly store = inject(Store);

  public readonly recommendationsList$ = this.store.select(selectRecommendations);

  public loadRecommendations() {
    this.store.dispatch(RecommendationActions.loadRecommendations());
  }
}
