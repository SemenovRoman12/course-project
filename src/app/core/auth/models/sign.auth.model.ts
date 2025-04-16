import {UserEntity} from '@models/user.model';

export interface RegisterUser {
  name: string;
  email: string;
  password: string;
}

export interface SignAuthResponse {
  token: string;
  data: UserEntity;
}

export interface SignAuthUser {
  email: string;
  password: string;
}

export interface SignAuthRequest extends UserEntity {
  password: string;
}
