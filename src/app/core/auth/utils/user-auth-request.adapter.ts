import {RegisterUser, SignAuthRequest} from '@auth/data-access/models/sign.auth.model';


export function authToRequest(userData: RegisterUser): SignAuthRequest {
  return {
    ...userData,
    height: 0,
    weight: 0,
    age: 0,
    gender: null,
  };
}

