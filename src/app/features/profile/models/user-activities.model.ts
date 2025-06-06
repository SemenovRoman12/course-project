import {UserActivitiesEntity} from '@features/profile/profile-container/profile-container.store';

export type UserActivitiesVM = Omit<UserActivitiesEntity, 'user'>;
