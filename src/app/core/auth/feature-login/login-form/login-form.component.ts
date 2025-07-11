import {ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output, signal} from '@angular/core';
import {AuthErrorMessage, ErrorAuthResponse, SignAuthUser} from '@auth/data-access/models/sign.auth.model';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormType} from '@models/form.type';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatError, MatFormField, MatLabel, MatSuffix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {emailValidator} from '@auth/utils/validators/email-validator';
import {passwordValidator} from '@auth/utils/validators/password-validator';
import {JsonPipe} from '@angular/common';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'login-form',
  standalone: true,
  imports: [
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    RouterLinkActive,
    RouterLink,
    JsonPipe,
    MatSuffix,
    MatIcon,
    MatIconButton,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {
  @Output() loginEvent = new EventEmitter<SignAuthUser>();
  @Input({required: true}) authError: ErrorAuthResponse | null = null;

  private readonly fb = inject(FormBuilder);
  protected readonly AuthErrorMessage = AuthErrorMessage;

  public hide = signal<boolean>(true);

  public readonly loginForm: FormGroup<FormType<SignAuthUser>> = this.fb.group({
    email: new FormControl('', [Validators.required, emailValidator(),]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      passwordValidator(),
    ]),
  });

  public hidePassword(): void {
    this.hide.set(!this.hide());
  }

  public onSubmit() {
    if(this.loginForm.valid) {
      const data: SignAuthUser = {
        email: this.loginForm.value.email?.trim().toLowerCase() as string,
        password: this.loginForm.value.password as string,
      };
      this.loginEvent.emit(data);
    }
  }


}
