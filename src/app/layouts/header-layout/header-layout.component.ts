import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {AuthFacade} from '@auth/+state/auth.facade';
import {LogoutButtonComponent} from '@auth/feature-logut/logout-button/logout-button.component';
import {AsyncPipe} from '@angular/common';
import {LetDirective} from '@ngrx/component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'header-layout',
  standalone: true,
  imports: [
    MatToolbar,
    LogoutButtonComponent,
    AsyncPipe,
    LetDirective,
    RouterLink,
  ],
  templateUrl: './header-layout.component.html',
  styleUrl: './header-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderLayoutComponent {
  private readonly authFacade = inject(AuthFacade);
  public readonly isAuthenticated$ = this.authFacade.isAuthenticated$;
}
