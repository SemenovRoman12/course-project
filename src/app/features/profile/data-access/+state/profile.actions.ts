import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {UserActivitiesEntity} from '@features/profile/data-access/+state/profile.reducer';

export const ProfileActions = createActionGroup({
  source: "Profile",
  events: {
    "Activities": emptyProps(),
    "Activities Success": props<{ activities: UserActivitiesEntity[] }>(),
    "Activities Failure": props<{ error: Error }>(),
  },
});
