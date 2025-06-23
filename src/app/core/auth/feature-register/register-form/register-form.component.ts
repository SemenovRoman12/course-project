import {ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output, signal} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormType} from '@models/form.type';
import {MatError, MatFormField, MatHint, MatLabel, MatSuffix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {AuthErrorMessage, ErrorAuthResponse, RegisterUser} from '@auth/data-access/models/sign.auth.model';
import {MatButton, MatIconButton} from '@angular/material/button';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {MatOption, MatSelect} from '@angular/material/select';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {emailValidator} from '@auth/utils/validators/email-validator';
import {passwordValidator} from '@auth/utils/validators/password-validator';
import {MatIcon} from "@angular/material/icon";
import {AuthFacade} from '@auth/data-access/auth.facade';

@Component({
  selector: 'register-form',
  standalone: true,
    imports: [
        ReactiveFormsModule,
        MatFormField,
        MatInput,
        MatLabel,
        MatError,
        MatButton,
        RouterLink,
        RouterLinkActive,
        MatSelect,
        MatOption,
        MatDatepickerInput,
        MatDatepickerToggle,
        MatSuffix,
        MatDatepicker,
        MatHint,
        MatIcon,
        MatIconButton
    ],
  providers: [],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterFormComponent {
  @Output() registerEvent = new EventEmitter<RegisterUser>();
  @Input({required:true}) authError: ErrorAuthResponse | null = null;

  private readonly fb = inject(FormBuilder);
  protected readonly AuthErrorMessage = AuthErrorMessage;
  public hide = signal<boolean>(true);

  public hidePassword(): void {
    this.hide.set(!this.hide());
  }

  public readonly registerForm: FormGroup<FormType<RegisterUser>> = this.fb.group({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, emailValidator()]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      passwordValidator(),
    ]),
  });

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
