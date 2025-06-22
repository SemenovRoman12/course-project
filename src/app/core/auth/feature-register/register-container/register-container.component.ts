import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {RegisterFormComponent} from '../register-form/register-form.component';
import {RegisterUser} from '@auth/data-access/models/sign.auth.model';
import {AuthFacade} from '../../data-access/auth.facade';
import {LetDirective} from '@ngrx/component';

@Component({
  selector: 'register-container',
  standalone: true,
  imports: [
    RegisterFormComponent,
    LetDirective
  ],
  templateUrl: './register-container.component.html',
  styleUrl: './register-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterContainerComponent {
  private readonly authFacade = inject(AuthFacade);
  public authError$ = this.authFacade.authError$;

  public registerSubmit(data: RegisterUser) {
    this.authFacade.register(data);
  }
}
