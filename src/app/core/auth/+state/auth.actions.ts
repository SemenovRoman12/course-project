import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {RegisterUser, SignAuthResponse, SignAuthUser} from '../models/sign.auth.model';
import {UserEntity} from '@models/user.model';

export const AuthActions = createActionGroup({
  source: "Auth",
  events: {
    'Register': props<{ userData: RegisterUser }>(),
    'Register Success': props<{ res: SignAuthResponse }>(),
    'Register Failure': props<{ error: Error }>(),

    'Login': props<{ userData: SignAuthUser}>(),
    'Login Success': props<{ res: SignAuthResponse }>(),
    'Login Failure': props<{ error: Error }>(),

    'Get User': emptyProps(),
    'Get User Success': props<{ userData: UserEntity }>(),
    'Get User Failure': props<{ error: Error }>(),

    'Logout': emptyProps(),
  },
});
