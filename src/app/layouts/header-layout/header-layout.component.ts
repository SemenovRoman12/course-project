import { ChangeDetectionStrategy, Component } from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';

@Component({
  selector: 'header-layout',
  standalone: true,
  imports: [
    MatToolbar
  ],
  templateUrl: './header-layout.component.html',
  styleUrl: './header-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderLayoutComponent {

}
