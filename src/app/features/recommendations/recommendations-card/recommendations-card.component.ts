import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'recommendations-card',
  standalone: true,
  imports: [],
  templateUrl: './recommendations-card.component.html',
  styleUrl: './recommendations-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecommendationsCardComponent {

}
