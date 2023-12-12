import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuth = createFeatureSelector<AuthState>('auth');

export const selectIsAuthenticated = createSelector(
  selectAuth,
  (state: AuthState) =>
    !!(state.user?.id && state.jwtTokens.token && state.jwtTokens.refresh_token)
);
export const selectUser = createSelector(
  selectAuth,
  (state: AuthState) => state.user
);

export const selectUserError = createSelector(
  selectAuth,
  (state: AuthState) => state.errors
);

export const selectJwtTokens = createSelector(
  selectAuth,
  (state: AuthState) => state.jwtTokens
);
