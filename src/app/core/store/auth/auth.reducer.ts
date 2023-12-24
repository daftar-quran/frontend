import { Action, createReducer, on } from '@ngrx/store';
import * as featureActions from '../auth/auth.actions';
import { IJwtTokens, IQlError, IUser, JwtTokens, User } from '@app/models';

export interface AuthState {
  jwtTokens: IJwtTokens;
  refreshTokenInProgress: boolean;
  user: IUser;
  errors?: IQlError;
}

// Here is the initial state set if no changes happened
export const initialAuthState: AuthState = {
  jwtTokens: new JwtTokens(),
  refreshTokenInProgress: false,
  user: new User(),
  errors: null,
};

const featureReducer = createReducer(
  initialAuthState,
  on(
    featureActions.LoginSuccess,
    featureActions.RefreshTokenSuccess,
    featureActions.SetRefreshTokenInProgress,
    featureActions.ForgotResetPasswordError,
    (state, action) => ({
      ...state,
      ...action,
    })
  ),
  on(featureActions.InitializeAuthState, () => ({
    ...initialAuthState,
  })),
  on(
    featureActions.RefreshTokenError,
    featureActions.LoginError,
    (state, { errors }) => ({
      ...state,
      jwtTokens: new JwtTokens(),
      errors,
    })
  ),
  on(featureActions.GetUserError, (state, { errors }) => ({
    ...state,
    user: new User(),
    errors,
  }))
);

export function authReducer(
  state: AuthState | undefined,
  action: Action
): AuthState {
  return featureReducer(state, action);
}
