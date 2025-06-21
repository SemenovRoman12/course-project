import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {
  ChangeProfileDataPayload,
  ChangeProfileDataResponse,
  RegisterUser,
  SignAuthResponse,
  SignAuthUser
} from '@auth/data-access/models/sign.auth.model';
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

    'Change Profile Data': props<{ newUserData: ChangeProfileDataPayload }>(),
    'Change Profile Data Success': props<{ newUserData: ChangeProfileDataResponse }>(),
    'Change Profile Data Failure': props<{ error: Error }>(),

    'Logout': emptyProps(),
  },
});
