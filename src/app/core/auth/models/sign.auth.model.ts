import {UserEntity} from '@models/user.model';

export interface RegisterUser {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  token: string;
  data: UserEntity;
}

export interface SignAuthUser {
  email: string;
  password: string;
}

export interface SignAuthPayload {
  authToken: string;
}
