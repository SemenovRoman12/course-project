import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserEditProfileVM} from '@features/profile/data-access/models/user-profile.model';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatLabel, MatSuffix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatIcon} from '@angular/material/icon';
import {FormType} from '@models/form.type';

@Component({
  selector: 'edit-profile-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatButton,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatSelect,
    MatOption,
    MatIcon,
    MatSuffix
  ],
  templateUrl: './edit-profile-dialog.component.html',
  styleUrl: './edit-profile-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditProfileDialog {
  private readonly dialogRef = inject(MatDialogRef);
  private readonly fb = inject(FormBuilder);
  public data: UserEditProfileVM = inject(MAT_DIALOG_DATA);

  public readonly profileForm: FormGroup<FormType<UserEditProfileVM>> = this.fb.group({
    name: new FormControl(this.data.name, Validators.required),
    height: new FormControl(this.data.height, Validators.required),
    weight: new FormControl(this.data.weight, Validators.required),
    age: new FormControl(this.data.age, Validators.required),
    gender: new FormControl(this.data.gender, Validators.required),
  });

  onDialogSave() {
    this.dialogRef.close(this.profileForm.value);
  }

  onDialogClose() {
    this.dialogRef.close(false);
  }
}
