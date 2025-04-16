import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {AuthFacade} from '../../core/auth/+state/auth.facade';
import {LogoutButtonComponent} from '../../core/auth/feature-logut/logout-button/logout-button.component';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'header-layout',
  standalone: true,
  imports: [
    MatToolbar,
    LogoutButtonComponent,
    AsyncPipe
  ],
  templateUrl: './header-layout.component.html',
  styleUrl: './header-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderLayoutComponent {
  private readonly authFacade = inject(AuthFacade);
  public readonly isAuthenticated$ = this.authFacade.isAuthenticated$;
}
