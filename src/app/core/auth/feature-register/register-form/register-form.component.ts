import {ChangeDetectionStrategy, Component, EventEmitter, inject, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormType} from '@models/form.type';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {RegisterUser} from '../../models/sign.auth.model';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'register-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatError,
    MatButton
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterFormComponent {
  @Output() registerEvent = new EventEmitter<RegisterUser>();

  private readonly fb = inject(FormBuilder);

  public readonly registerForm: FormGroup<FormType<RegisterUser>> = this.fb.group({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })

  public onSubmit() {
    if(this.registerForm.valid) {
      const data: RegisterUser = {
        name: this.registerForm.value.name?.trim() as string,
        email: this.registerForm.value.email?.trim().toLowerCase() as string,
        password: this.registerForm.value.password as string,
      };
      this.registerEvent.emit(data);
    }
  }
}
