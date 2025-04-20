import { ChangeDetectionStrategy, Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'about',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent {

}
