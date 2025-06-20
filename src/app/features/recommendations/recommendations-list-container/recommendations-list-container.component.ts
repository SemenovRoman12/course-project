import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {
  RecommendationsFormComponent
} from '@features/recommendations/recommendations-form/recommendations-form.component';
import {RecommendationFacadeService} from '@features/recommendations/data-access/recommendation.facade.service';
import {
  RecommendationsListComponent
} from '@features/recommendations/recommendations-list/recommendations-list.component';
import {LetDirective} from '@ngrx/component';
import {Observable} from 'rxjs';
import {Recommendation} from '@features/recommendations/data-access/models/recommendation.model';

@Component({
  selector: 'recommendations-list-container',
  standalone: true,
  imports: [
    RecommendationsFormComponent,
    RecommendationsListComponent,
    LetDirective
  ],
  templateUrl: './recommendations-list-container.component.html',
  styleUrl: './recommendations-list-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecommendationsListContainerComponent implements OnInit {

  private readonly recommendationFacade = inject(RecommendationFacadeService);
  public readonly recommendationsList$: Observable<Recommendation[]> = this.recommendationFacade.recommendationsList$;
  public readonly recStatus$ = this.recommendationFacade.recStatus$;


  public deleteRecommendation(recommendation: Recommendation): void {
    this.recommendationFacade.deleteRecommendation(recommendation.id)
  }

  ngOnInit() {
    this.recommendationFacade.loadRecommendations()
  }
}
