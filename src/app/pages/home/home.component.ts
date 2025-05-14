import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {ReviewsFacade} from '@features/reviews/reviews.facade';
import {AboutSectionComponent} from '../../shared/components/about-section/about-section.component';
import {
  ReviewsListContainerComponent
} from '@features/reviews/reviews-list-container/reviews-list-container.component';
import {
  ProductsListContainerComponent
} from '@features/products/products-list-container/products-list-container.component';

@Component({
  selector: 'home',
  standalone: true,
  imports: [
    AboutSectionComponent,
    ReviewsListContainerComponent,
    ProductsListContainerComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit{
  private readonly reviewsFacade = inject(ReviewsFacade);

  ngOnInit() {
    this.reviewsFacade.loadReviews();
  }
}
