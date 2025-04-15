import {UserEntity} from '@models/user.model';
import {RegisterUser} from '../auth/models/sign.auth.model';

export const usersEntityAdapter = {
  RegisterToEntity(registerUser: RegisterUser): UserEntity {
    const { password, ...publicFields } = registerUser;

    return {
      ...publicFields,
      height: 0,
      weight: 0,
      age: 0,
      gender: '',
    };
  }
}
