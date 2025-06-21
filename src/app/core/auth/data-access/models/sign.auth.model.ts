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

export interface ChangeProfileDataPayload {
  name?: string;
  weight?: number
  height?: number
}

export interface ChangeProfileDataResponse extends Required<UserEntity> {}

export interface ErrorAuthResponse {
  message: string;
  error: string;
  statusCode: number;
}
