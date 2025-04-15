import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'login-form',
  standalone: true,
  imports: [],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {

}
