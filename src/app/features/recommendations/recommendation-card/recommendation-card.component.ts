import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Recommendation} from '@features/recommendations/data-access/models/recommendation.model';
import {MatCard, MatCardActions, MatCardContent} from '@angular/material/card';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'recommendation-card',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardActions,
    MatIconButton,
    MatIcon
  ],
  templateUrl: './recommendation-card.component.html',
  styleUrl: './recommendation-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecommendationCardComponent {
  @Input({required: true}) recommendation!: Recommendation;
  @Output() deleteRecommendation = new EventEmitter();

  onDeleteRecommendation(recommendation: Recommendation): void {
    this.deleteRecommendation.emit(recommendation);
  };
}
