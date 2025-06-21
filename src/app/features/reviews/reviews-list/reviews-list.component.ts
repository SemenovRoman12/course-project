import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ReviewEntity} from '@features/reviews/data-access/models/reviews.model';
import {ReviewCardComponent} from '@features/reviews/review-card/review-card.component';

@Component({
  selector: 'reviews-list',
  standalone: true,
  imports: [
    ReviewCardComponent
  ],
  templateUrl: './reviews-list.component.html',
  styleUrl: './reviews-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewsListComponent {
  @Input() reviews: ReviewEntity[] = [];
}
