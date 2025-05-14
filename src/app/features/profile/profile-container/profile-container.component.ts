import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {AuthFacade} from '@auth/auth.facade';
import {ProfileComponent} from '@features/profile/profile/profile.component';
import {LetDirective} from '@ngrx/component';

@Component({
  selector: 'profile-container',
  standalone: true,
  imports: [
    ProfileComponent,
    LetDirective,

  ],
  templateUrl: './profile-container.component.html',
  styleUrl: './profile-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileContainerComponent implements OnInit {
  private readonly authFacade = inject(AuthFacade);
  public readonly user$ = this.authFacade.loggedUser$;

  ngOnInit() {

  }
}
