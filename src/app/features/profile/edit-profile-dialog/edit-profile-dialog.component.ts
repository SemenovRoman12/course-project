import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserEditProfileVM} from '@features/profile/models/user-profile.model';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';

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
    MatLabel
  ],
  templateUrl: './edit-profile-dialog.component.html',
  styleUrl: './edit-profile-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditProfileDialog {
  private readonly dialogRef = inject(MatDialogRef);
  private readonly fb = inject(FormBuilder);
  public data: UserEditProfileVM = inject(MAT_DIALOG_DATA);

  public readonly profileForm = this.fb.group({
    name: new FormControl(this.data.name, Validators.required),
    height: new FormControl(this.data.height, Validators.required),
    weight: new FormControl(this.data.weight, Validators.required),
  });

  onDialogSave() {
    this.dialogRef.close(this.profileForm.value);
  }

  onDialogClose() {
    this.dialogRef.close(false);
  }
}
