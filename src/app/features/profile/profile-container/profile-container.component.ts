import {AfterContentInit, ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit} from '@angular/core';
import {AuthFacade} from '@auth/auth.facade';
import {ProfileComponent} from '@features/profile/profile/profile.component';
import {LetDirective} from '@ngrx/component';
import {ProfileChartsComponent} from '@features/profile/profile-charts/profile-charts.component';
import {
  ProfileContainerStoreService,
  UserActivitiesState
} from '@features/profile/profile-container/profile-container.store';
import {interval, Observable, tap} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'profile-container',
  standalone: true,
  imports: [
    ProfileComponent,
    LetDirective,
    ProfileChartsComponent,

  ],
  templateUrl: './profile-container.component.html',
  styleUrl: './profile-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProfileContainerStoreService],
})
export class ProfileContainerComponent implements OnInit {
  private readonly authFacade = inject(AuthFacade);
  public readonly user$ = this.authFacade.loggedUser$;
  private readonly profileStore = inject(ProfileContainerStoreService);
  private readonly destroyRef = inject(DestroyRef);

  public readonly profileActivityData$ = this.profileStore.select(state => ({
    activities: state.activities,
    activitiesStatus: state.activitiesStatus,
    error: state.error,
  }));

  ngOnInit() {
    this.user$.pipe(
      tap(() => this.profileStore.loadActivities()),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe()
  }
}
