import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {
  ChangeProfileDataPayload,
  ChangeProfileDataResponse, ErrorAuthResponse,
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
    'Register Failure': props<{ error: ErrorAuthResponse }>(),

    'Login': props<{ userData: SignAuthUser}>(),
    'Login Success': props<{ res: SignAuthResponse }>(),
    'Login Failure': props<{ error: ErrorAuthResponse }>(),

    'Get User': emptyProps(),
    'Get User Success': props<{ userData: UserEntity }>(),
    'Get User Failure': props<{ error: ErrorAuthResponse }>(),

    'Change Profile Data': props<{ newUserData: ChangeProfileDataPayload }>(),
    'Change Profile Data Success': props<{ newUserData: ChangeProfileDataResponse }>(),
    'Change Profile Data Failure': props<{ error: ErrorAuthResponse }>(),

    'Logout': emptyProps(),
  },
});
