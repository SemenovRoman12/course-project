import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {AuthFacade} from '@auth/data-access/auth.facade';
import {ProfileComponent} from '@features/profile/profile/profile.component';
import {LetDirective} from '@ngrx/component';
import {ProfileChartsComponent} from '@features/profile/profile-charts/profile-charts.component';
import {ProfileFacade} from '@features/profile/data-access/profile.facade';
import {MatProgressBar} from '@angular/material/progress-bar';
import {map, Observable} from 'rxjs';
import {UserEntity} from '@models/user.model';
import {LoadingStatus} from '@models/loading-status.type';
import {UserActivitiesVM} from '@features/profile/data-access/models/user-activities.model';
import {UserActivitiesAdapter} from '@features/profile/utils/activities-data.adapter';

@Component({
  selector: 'profile-container',
  standalone: true,
  imports: [
    ProfileComponent,
    LetDirective,
    ProfileChartsComponent,
    MatProgressBar,
  ],
  templateUrl: './profile-container.component.html',
  styleUrl: './profile-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileContainerComponent implements OnInit {
  private readonly profileFacade = inject(ProfileFacade);
  private readonly authFacade = inject(AuthFacade);

  public readonly user$: Observable<UserEntity> = this.authFacade.loggedUser$;
  public readonly activitiesData$: Observable<UserActivitiesVM[]> = this.profileFacade.activities$.pipe(
    map((activitiesList) => activitiesList.map(
      (activities) => UserActivitiesAdapter.activitiesFromEntityToVm(activities))
    )
  );
  public readonly profileStatus$: Observable<LoadingStatus> = this.profileFacade.profileStatus$;

  ngOnInit() {
    this.profileFacade.init()
  }
}
