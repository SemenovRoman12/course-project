import {RegisterUser, SignAuthRequest} from '../auth/models/sign.auth.model';

export const userAuthRequestAdapter = {
  AuthToRequest(userData: RegisterUser): SignAuthRequest {
    return {
      ...userData,
      height: 0,
      weight: 0,
      age: 0,
      gender: '',
    };
  }
};
