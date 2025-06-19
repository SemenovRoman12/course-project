import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {
  RecommendationsFormComponent
} from '@features/recommendations/recommendations-form/recommendations-form.component';
import {RecommendationFacadeService} from '@features/recommendations/data-access/recommendation.facade.service';

@Component({
  selector: 'recommendations-list-container',
  standalone: true,
  imports: [
    RecommendationsFormComponent
  ],
  templateUrl: './recommendations-list-container.component.html',
  styleUrl: './recommendations-list-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecommendationsListContainerComponent implements OnInit {

  private recommendationFacade = inject(RecommendationFacadeService);

  ngOnInit() {
    this.recommendationFacade.loadRecommendations()
    this.recommendationFacade.recommendationsList$.subscribe(recommendations => console.log(recommendations));
  }
}
