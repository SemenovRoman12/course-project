import {ChangeDetectionStrategy, Component, effect, inject, signal} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {AuthFacade} from '@auth/data-access/auth.facade';
import {LogoutButtonComponent} from '@auth/feature-logut/logout-button/logout-button.component';
import {AsyncPipe} from '@angular/common';
import {LetDirective} from '@ngrx/component';
import {RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';

@Component({
  selector: 'header-layout',
  standalone: true,
  imports: [
    MatToolbar,
    LogoutButtonComponent,
    AsyncPipe,
    LetDirective,
    RouterLink,
    MatIcon,
    MatIconButton,
  ],
  templateUrl: './header-layout.component.html',
  styleUrl: './header-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderLayoutComponent {
  private readonly authFacade = inject(AuthFacade);
  public readonly isAuthenticated$ = this.authFacade.isAuthenticated$;

  public darkMode = signal(false);

  public setDarkMode = effect(() => {
    document.documentElement.classList.toggle('dark', this.darkMode());
  });
}
