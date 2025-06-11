import {UserActivitiesVM} from '@features/profile/models/user-activities.model';
import {UserActivitiesEntity} from '@features/profile/data-access/+state/profile.reducer';


export const UserActivitiesAdapter = {
  activitiesFromEntityToVm(activitiesData: UserActivitiesEntity): UserActivitiesVM {
    const {user, ...data} = activitiesData;

    return data;
  }
}
