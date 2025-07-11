import {
  ChangeDetectionStrategy,
  Component, DestroyRef,
  inject,
  Input,
  ViewEncapsulation
} from '@angular/core';
import {UserEntity} from '@models/user.model';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelTitle,
  MatExpansionPanelHeader, MatExpansionPanelContent
} from '@angular/material/expansion';
import {MatCard, MatCardActions, MatCardContent} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton, MatMiniFabButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {EditProfileDialog} from '@features/profile/edit-profile-dialog/edit-profile-dialog.component';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {UserEditProfileVM} from '@features/profile/data-access/models/user-profile.model';
import {AuthFacade} from '@auth/data-access/auth.facade';

@Component({
  selector: 'profile',
  standalone: true,
  imports: [
    NgxChartsModule,
    MatExpansionPanel,
    MatExpansionPanelDescription,
    MatExpansionPanelTitle,
    MatAccordion,
    MatExpansionPanelHeader,
    MatExpansionPanelContent,
    MatCard,
    MatCardContent,
    MatCardActions,
    MatIcon,
    MatIconButton,
    MatMiniFabButton
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ProfileComponent {
  @Input({required: true}) user!: UserEntity;

  private readonly destroyRef = inject(DestroyRef);
  public readonly dialog = inject(MatDialog);
  private readonly authFacade = inject(AuthFacade);

  onOpenEditProfileDialog() {
    const { id, email, ...editableUserFields } = this.user;

    const dialogRef = this.dialog.open<EditProfileDialog>(EditProfileDialog, {
      data: editableUserFields as UserEditProfileVM,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        if(result) {
          this.authFacade.changeProfile(result);
        }
      });
  }
}
