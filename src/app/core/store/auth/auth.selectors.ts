import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuth = createFeatureSelector<AuthState>('auth');

export const IsAuthenticatedSelector = createSelector(
  selectAuth,
  (state: AuthState) =>
    !!(state.user?.id && state.jwtTokens.token && state.jwtTokens.refresh_token)
);
export const UserSelector = createSelector(
  selectAuth,
  (state: AuthState) => state.user
);

export const UserErrorSelector = createSelector(
  selectAuth,
  (state: AuthState) => state.errors
);

export const JwtTokensSelector = createSelector(
  selectAuth,
  (state: AuthState) => state.jwtTokens
);
