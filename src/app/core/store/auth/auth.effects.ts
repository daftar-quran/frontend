import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType, concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, finalize, of, switchMap, tap } from 'rxjs';
import {
  IAuthenticationResult,
  IJwtTokens,
  IQlError,
  QlErrorClass,
} from '@app/models';
import { HttpErrorResponse } from '@angular/common/http';
import {
  GetCurrentUser,
  Login,
  LoginError,
  LoginSuccess,
  Logout,
  RefreshToken,
  RefreshTokenError,
  RefreshTokenSuccess,
  SetRefreshTokenInProgress,
} from './auth.actions';
import { AuthService } from '../../auth/auth.service';
import { map } from 'rxjs/operators';
import { selectJwtTokens } from './auth.selectors';

@Injectable()
export class AuthEffects {
  private actions$: Actions = inject(Actions);
  private store: Store = inject(Store);
  private authService: AuthService = inject(AuthService);

  LoginEffect = createEffect(() => {
    return this.actions$.pipe(
      ofType(Login),
      switchMap((data) =>
        this.authService.login(data.request).pipe(
          map((jwtTokens: IJwtTokens) => {
            this.store.dispatch(LoginSuccess({ jwtTokens }));
            return GetCurrentUser();
          }),
          catchError((error: HttpErrorResponse) => {
            const iWsError: IQlError = new QlErrorClass(error);
            return of(
              LoginError({
                errors: {
                  ...iWsError,
                  messageToShow: 'Login error',
                },
              })
            );
          })
        )
      )
    );
  });

  RefreshTokenEffect = createEffect(() => {
    return this.actions$.pipe(
      ofType(RefreshToken),
      concatLatestFrom(() => this.store.select(selectJwtTokens)),
      tap(() =>
        this.store.dispatch(
          SetRefreshTokenInProgress({
            refreshTokenInProgress: true,
          })
        )
      ),
      switchMap(([, jwtTokens]: [unknown, IAuthenticationResult]) =>
        this.authService.refreshToken(jwtTokens.RefreshToken).pipe(
          map((jwtTokens: IJwtTokens) => RefreshTokenSuccess({ jwtTokens })),
          catchError((error: HttpErrorResponse) => {
            this.store.dispatch(Logout({ redirect: true }));
            return of(
              RefreshTokenError({
                errors: {
                  ...new QlErrorClass(error),
                  messageToShow: 'Error refreshToken',
                },
              })
            );
          }),
          finalize(() => {
            this.store.dispatch(
              SetRefreshTokenInProgress({
                refreshTokenInProgress: false,
              })
            );
          })
        )
      )
    );
  });
}
