import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {UserActivitiesEntity} from '@features/profile/data-access/+state/profile.reducer';

export const ProfileActions = createActionGroup({
  source: "Profile",
  events: {
    "Load Activities": emptyProps(),
    "Load Activities Success": props<{ activities: UserActivitiesEntity[] }>(),
    "Load Activities Failure": props<{ error: Error }>(),
  },
});
