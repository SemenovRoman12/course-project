import {inject, Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {ReviewsActions} from '@features/reviews/data-access/+state/reviews.actions';
import {selectReviews, selectReviewsStatus} from '@features/reviews/data-access/+state/reviews.selectors';

@Injectable({
  providedIn: 'root'
})
export class ReviewsFacade {
  private readonly store = inject(Store);

  public readonly reviewsList$ = this.store.select(selectReviews);
  public readonly reviewsStatus$ = this.store.select(selectReviewsStatus);

  public loadReviews() {
    this.store.dispatch(ReviewsActions.loadReviews());
  }
}
