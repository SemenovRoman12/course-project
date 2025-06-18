import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {RegisterFormComponent} from '../register-form/register-form.component';
import {RegisterUser} from '../../models/sign.auth.model';
import {AuthFacade} from '../../auth.facade';

@Component({
  selector: 'register-container',
  standalone: true,
  imports: [
    RegisterFormComponent
  ],
  templateUrl: './register-container.component.html',
  styleUrl: './register-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterContainerComponent {
  private readonly authFacade = inject(AuthFacade);

  public registerSubmit(data: RegisterUser) {
    this.authFacade.register(data);
    console.log(data);
  }
}
