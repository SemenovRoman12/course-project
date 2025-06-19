import {ChangeDetectionStrategy, Component, EventEmitter, inject, Output} from '@angular/core';
import {RegisterUser, SignAuthUser} from '@auth/data-access/models/sign.auth.model';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormType} from '@models/form.type';
import {MatButton} from '@angular/material/button';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {RouterLink, RouterLinkActive} from '@angular/router';

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
    RouterLink
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {
  @Output() loginEvent = new EventEmitter<SignAuthUser>();

  private readonly fb = inject(FormBuilder);

  public readonly loginForm: FormGroup<FormType<SignAuthUser>> = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })

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
