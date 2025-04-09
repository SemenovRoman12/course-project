import { ChangeDetectionStrategy, Component } from '@angular/core';
import {HeaderLayoutComponent} from '../header-layout/header-layout.component';
import {FooterLayoutComponent} from '../footer-layout/footer-layout.component';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'main-layout',
  standalone: true,
  imports: [
    HeaderLayoutComponent,
    FooterLayoutComponent,
    MatButton
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayoutComponent {

}
