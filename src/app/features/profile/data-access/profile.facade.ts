import {inject, Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {
  selectActivities,
  selectProfileStatus
} from '@features/profile/data-access/+state/profile.selectors';
import {ProfileActions} from '@features/profile/data-access/+state/profile.actions';

@Injectable({
  providedIn: 'root'
})
export class ProfileFacade {
  private readonly store = inject(Store);

  public readonly activities$ = this.store.select(selectActivities);
  public readonly profileStatus$ = this.store.select(selectProfileStatus);

  public init() {
    this.store.dispatch(ProfileActions.loadActivities());
  }
}
