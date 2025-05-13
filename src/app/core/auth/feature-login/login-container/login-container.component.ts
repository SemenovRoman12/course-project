import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {LoginFormComponent} from '../login-form/login-form.component';
import {AuthFacade} from '../../auth.facade';
import {SignAuthUser} from '../../models/sign.auth.model';

@Component({
  selector: 'login-container',
  standalone: true,
  imports: [
    LoginFormComponent
  ],
  templateUrl: './login-container.component.html',
  styleUrl: './login-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginContainerComponent {
  private readonly authFacade = inject(AuthFacade);

  public loginSubmit(userData: SignAuthUser) {
    this.authFacade.login(userData);
  }
}
