import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'recomendations-list',
  standalone: true,
  imports: [],
  templateUrl: './recomendations-list.component.html',
  styleUrl: './recomendations-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecomendationsListComponent {

}
