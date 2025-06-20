import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Recommendation} from '@features/recommendations/data-access/models/recommendation.model';
import {
  RecommendationsCardComponent
} from '@features/recommendations/recommendations-card/recommendations-card.component';

@Component({
  selector: 'recommendations-list',
  standalone: true,
  imports: [
    RecommendationsCardComponent
  ],
  templateUrl: './recommendations-list.component.html',
  styleUrl: './recommendations-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecommendationsListComponent {
  @Input({required: true}) recommendationList: Recommendation[] = []
  @Output() deleteRecommendation = new EventEmitter();

  onDeleteRecommendation(recommendation: Recommendation): void {
    this.deleteRecommendation.emit(recommendation);
  };
}
