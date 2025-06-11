import {UserActivitiesEntity} from '@features/profile/data-access/+state/profile.reducer';


export type UserActivitiesVM = Omit<UserActivitiesEntity, 'user'>;
