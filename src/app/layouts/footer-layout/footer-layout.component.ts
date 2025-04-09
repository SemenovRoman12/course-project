import { ChangeDetectionStrategy, Component } from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';

@Component({
  selector: 'footer-layout',
  standalone: true,
  imports: [
    MatToolbar
  ],
  templateUrl: './footer-layout.component.html',
  styleUrl: './footer-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterLayoutComponent {

}
