import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {
  RecommendationsFormComponent
} from '@features/recommendations/recommendations-form/recommendations-form.component';
import {RecommendationFacadeService} from '@features/recommendations/data-access/recommendation.facade.service';
import {LetDirective} from '@ngrx/component';
import {Observable} from 'rxjs';
import {Recommendation} from '@features/recommendations/data-access/models/recommendation.model';
import {MatProgressBar} from "@angular/material/progress-bar";
import {ProfileFacade} from '@features/profile/data-access/profile.facade';
import {RecommendationCardComponent} from '@features/recommendations/recommendation-card/recommendation-card.component';
import {
  RecommendationsListComponent
} from '@features/recommendations/recommendations-list/recommendations-list.component';

@Component({
  selector: 'recommendations-list-container',
  standalone: true,
  imports: [
    RecommendationsFormComponent,
    RecommendationCardComponent,
    LetDirective,
    MatProgressBar,
    RecommendationsListComponent
  ],
  templateUrl: './recommendations-list-container.component.html',
  styleUrl: './recommendations-list-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecommendationsListContainerComponent implements OnInit {
  private readonly recommendationFacade = inject(RecommendationFacadeService);
  private readonly profileFacade = inject(ProfileFacade);
  public readonly recommendationsList$: Observable<Recommendation[]> = this.recommendationFacade.sortedRecommendationsList$;
  public readonly recStatus$ = this.recommendationFacade.recStatus$;


  public deleteRecommendation(recommendation: Recommendation): void {
    this.recommendationFacade.deleteRecommendation(recommendation.id)
  }

  ngOnInit() {
    this.profileFacade.init()
    this.recommendationFacade.init();
  }
}
