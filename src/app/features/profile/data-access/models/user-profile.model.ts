import {UserEntity} from '@models/user.model';


export type UserEditProfileVM = Pick<UserEntity, 'name' | 'weight' | 'height'>;
