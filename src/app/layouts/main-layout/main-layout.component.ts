import { ChangeDetectionStrategy, Component } from '@angular/core';
import {HeaderLayoutComponent} from '../header-layout/header-layout.component';
import {FooterLayoutComponent} from '../footer-layout/footer-layout.component';
import {MatButton} from '@angular/material/button';
import {
  RegisterContainerComponent
} from '../../core/auth/feature-register/register-container/register-container.component';
import {LoginContainerComponent} from '../../core/auth/feature-login/login-container/login-container.component';

@Component({
  selector: 'main-layout',
  standalone: true,
  imports: [
    HeaderLayoutComponent,
    FooterLayoutComponent,
    MatButton,
    RegisterContainerComponent,
    LoginContainerComponent
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayoutComponent {

}
