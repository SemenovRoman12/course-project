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

export interface SignAuthRequest extends Omit<UserEntity, 'id'> {
  password: string;
}

export interface ChangeProfileDataPayload {
  name?: string;
  weight?: number
  height?: number
}

export interface ChangeProfileDataResponse extends Required<UserEntity> {}

export enum AuthErrorMessage {
  NotFound = 'RESOURCE_USER_NOT_FOUND',
  InvalidData = 'RESOURCE_INVALID_LOGIN_OR_PASSWORD',
  UserAlreadyExist = 'RESOURCE_USER_ALREADY_EXISTS'
}

export interface ErrorAuthResponse {
  message: AuthErrorMessage;
  error: string;
  statusCode: number;
}
