import { ChangeDetectionStrategy, Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {AboutSectionComponent} from '@shared/components/about-section/about-section.component';

@Component({
  selector: 'about',
  standalone: true,
  imports: [
    NgOptimizedImage,
    AboutSectionComponent,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent {

}
