import {UserActivitiesEntity} from '@features/profile/profile-container/profile-container.store';
import {UserActivitiesVM} from '@features/profile/models/user-activities.model';



export const UserActivitiesAdapter = {
  activitiesFromEntityToVm(chartsData: UserActivitiesEntity): UserActivitiesVM {
    const {user, ...data} = chartsData;

    return data;
  }
}
