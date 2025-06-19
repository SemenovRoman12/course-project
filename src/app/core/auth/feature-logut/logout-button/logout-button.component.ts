import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {AuthFacade} from '../../data-access/auth.facade';

@Component({
  selector: 'logout-button',
  standalone: true,
  imports: [
    MatIconButton,
    MatIcon
  ],
  templateUrl: './logout-button.component.html',
  styleUrl: './logout-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoutButtonComponent {
  private readonly authFacade = inject(AuthFacade);

  public onLogout() {
    this.authFacade.logout();
  }
}
