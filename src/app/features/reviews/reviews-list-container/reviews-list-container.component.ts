import {ChangeDetectionStrategy, Component, inject, Input, OnInit} from '@angular/core';
import {ReviewsFacade} from '../data-access/reviews.facade';
import {ReviewsListComponent} from '@features/reviews/reviews-list/reviews-list.component';
import {MatProgressBar} from '@angular/material/progress-bar';
import {LetDirective} from '@ngrx/component';
import {map} from 'rxjs';

@Component({
  selector: 'reviews-list-container',
  standalone: true,
  imports: [
    ReviewsListComponent,
    MatProgressBar,
    LetDirective
  ],
  templateUrl: './reviews-list-container.component.html',
  styleUrl: './reviews-list-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewsListContainerComponent implements OnInit {
  @Input() limit: number | null = null;

  private readonly reviewsFacade = inject(ReviewsFacade);
  public readonly reviewsList$ = this.reviewsFacade.reviewsList$.pipe(
    map(reviews => (this.limit != null ? reviews.slice(0, this.limit) : reviews))
  );
  public readonly reviewsStatus$ = this.reviewsFacade.reviewsStatus$;

  ngOnInit() {
    this.reviewsFacade.loadReviews();
  }
}
