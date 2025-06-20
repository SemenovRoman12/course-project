import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Recommendation} from '@features/recommendations/data-access/models/recommendation.model';
import {MatCard, MatCardActions, MatCardContent} from '@angular/material/card';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'recommendations-card',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardActions,
    MatIconButton,
    MatIcon
  ],
  templateUrl: './recommendations-card.component.html',
  styleUrl: './recommendations-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecommendationsCardComponent {
  @Input({required: true}) recommendation!: Recommendation;
  @Output() deleteRecommendation = new EventEmitter();

  onDeleteRecommendation(recommendation: Recommendation): void {
    this.deleteRecommendation.emit(recommendation);
  };
}
