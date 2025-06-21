import {inject, Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {RecommendationActions} from '@features/recommendations/data-access/+state/recommendation.actions';
import {
  selectRecommendations,
  selectRecStatus
} from '@features/recommendations/data-access/+state/recommendation.selectors';
import {RecommendationRequestPayload} from '@features/recommendations/data-access/models/recommendation.model';

@Injectable({
  providedIn: 'root'
})
export class RecommendationFacadeService {
  private readonly store = inject(Store);

  public readonly recommendationsList$ = this.store.select(selectRecommendations);
  public recStatus$ = this.store.select(selectRecStatus);

  public init() {
    this.store.dispatch(RecommendationActions.loadRecommendations());
  }

  public deleteRecommendation(id: number) {
    this.store.dispatch(RecommendationActions.deleteRecommendation({id}));
  }

  public requestRecommendation(goal: RecommendationRequestPayload) {
    this.store.dispatch(RecommendationActions.requestRecommendation({goal}));
  }
}
