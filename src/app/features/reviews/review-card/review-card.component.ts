import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ReviewEntity} from '@features/reviews/data-access/models/reviews.model';
import {MatCard, MatCardContent, MatCardHeader} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'review-card',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatIcon
  ],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewCardComponent {
  @Input() review!: ReviewEntity;
}
