import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {LoginFormComponent} from '../login-form/login-form.component';
import {AuthFacade} from '../../data-access/auth.facade';
import {ErrorAuthResponse, SignAuthUser} from '@auth/data-access/models/sign.auth.model';
import {AsyncPipe} from '@angular/common';
import {Observable} from 'rxjs';
import {LetDirective} from '@ngrx/component';

@Component({
  selector: 'login-container',
  standalone: true,
  imports: [
    LoginFormComponent,
    AsyncPipe,
    LetDirective
  ],
  templateUrl: './login-container.component.html',
  styleUrl: './login-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginContainerComponent {
  private readonly authFacade = inject(AuthFacade);
  public readonly authError$: Observable<ErrorAuthResponse | null> = this.authFacade.authError$;

  public loginSubmit(userData: SignAuthUser) {
    this.authFacade.login(userData);
  }
}
