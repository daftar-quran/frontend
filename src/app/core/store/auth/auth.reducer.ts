import { IJwtTokens, IQlError, IUser, JwtTokens, User } from '@app/models';
import { Action, createReducer, on } from '@ngrx/store';
import {
  ForgotResetPasswordError,
  GetUserError,
  InitializeAuthState,
  LoginError,
  LoginSuccess,
  RefreshTokenError,
  RefreshTokenSuccess,
  RegisterError,
  RegisterSuccess,
  SetRefreshTokenInProgress,
} from './auth.actions';

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
    LoginSuccess,
    RegisterSuccess,
    RefreshTokenSuccess,
    SetRefreshTokenInProgress,
    ForgotResetPasswordError,
    (state, action) => ({
      ...state,
      ...action,
    })
  ),
  on(InitializeAuthState, () => ({
    ...initialAuthState,
  })),
  on(RefreshTokenError, LoginError, RegisterError, (state, { errors }) => ({
    ...state,
    jwtTokens: new JwtTokens(),
    errors,
  })),
  on(GetUserError, (state, { errors }) => ({
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
