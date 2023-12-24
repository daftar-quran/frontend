import { createAction, props } from '@ngrx/store';
import { IJwtTokens, IUser, IQlError } from '@app/models';
import { ILogin, IResetPasswordConfirmRequest } from '../../auth/models';

export const Login = createAction('[Auth] Login', props<{ request: ILogin }>());
export const LoginSuccess = createAction(
  '[Auth] Login Success',
  props<{ jwtTokens: IJwtTokens }>()
);
export const LoginError = createAction(
  '[Auth] Login Error',
  props<{ errors: IQlError }>()
);
export const SaveAuthState = createAction(
  '[Auth] Save AuthState into LocalStorage'
);
export const Logout = createAction(
  '[Auth] Logout',
  props<{ redirect?: boolean }>()
);
export const InitializeAuthState = createAction('[Auth] Initialize Auth State');

export const RefreshToken = createAction('[Auth] RefreshToken');
export const RefreshTokenSuccess = createAction(
  '[Auth] RefreshToken Success',
  props<{ jwtTokens: IJwtTokens }>()
);
export const RefreshTokenError = createAction(
  '[Auth] RefreshToken Error',
  props<{ errors: IQlError }>()
);
export const GetCurrentUser = createAction('[Auth] Get User');
export const GetUserSuccess = createAction(
  '[Auth] Get User Success',
  props<{ user: IUser }>()
);

export const GetUserError = createAction(
  '[Auth] Get User Error',
  props<{ errors: IQlError }>()
);
export const UpdateUserAdvancedSearchOptions = createAction(
  '[Auth] Update current user advanced search options',
  props<{ recherche_avancee_options: string }>()
);
export const ForgotPassword = createAction(
  '[Auth] Forgot Password',
  props<{ login: string }>()
);
export const ForgotResetPasswordError = createAction(
  '[Auth] Forgot Reset Password Error',
  props<{ errors: IQlError }>()
);
export const ResetPassword = createAction(
  '[Auth] Reset Password',
  props<{ request: IResetPasswordConfirmRequest }>()
);
export const ResetPasswordSuccess = createAction(
  '[Auth] Reset Password Success'
);
export const CheckResetPasswordToken = createAction(
  '[Auth] Check Reset Password Token',
  props<{ token: string }>()
);
export const SetRefreshTokenInProgress = createAction(
  '[Auth] Set RefreshToken In Progress',
  props<{ refreshTokenInProgress: boolean }>()
);
