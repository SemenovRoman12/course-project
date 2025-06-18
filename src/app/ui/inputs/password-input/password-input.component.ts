import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'password-input',
  standalone: true,
  imports: [],
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordInputComponent {

}
