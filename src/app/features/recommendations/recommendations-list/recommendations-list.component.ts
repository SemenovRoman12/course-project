import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'recommendations-list',
  standalone: true,
  imports: [],
  templateUrl: './recommendations-list.component.html',
  styleUrl: './recommendations-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecommendationsListComponent {

}
