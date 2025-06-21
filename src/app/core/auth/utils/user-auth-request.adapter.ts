import {RegisterUser, SignAuthRequest} from '@auth/data-access/models/sign.auth.model';
import {genderEnum} from '@models/user.model';

export const userAuthRequestAdapter = {
  AuthToRequest(userData: RegisterUser): SignAuthRequest {
    return {
      ...userData,
      height: 0,
      weight: 0,
      age: 0,
      gender: genderEnum.male,
    };
  }
};
