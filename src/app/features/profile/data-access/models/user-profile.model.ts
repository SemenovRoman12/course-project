import {UserEntity} from '@models/user.model';


export type UserEditProfileVM = Required<Pick<UserEntity, 'name' | 'weight' | 'height' | 'age' | 'gender'>>;
