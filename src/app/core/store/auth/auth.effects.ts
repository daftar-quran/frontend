import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  IAuthenticationResult,
  IJwtTokens,
  IQlError,
  IUser,
  QlErrorClass,
} from '@app/models';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { catchError, finalize, of, switchMap, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';
import {
  GetCurrentUser,
  InitializeAuthState,
  Login,
  LoginError,
  LoginSuccess,
  Logout,
  RefreshToken,
  RefreshTokenError,
  RefreshTokenSuccess,
  Register,
  RegisterError,
  RegisterSuccess,
  SetRefreshTokenInProgress,
} from './auth.actions';
import { selectJwtTokens } from './auth.selectors';

@Injectable()
export class AuthEffects {
  private actions$: Actions = inject(Actions);
  private store: Store = inject(Store);
  private authService: AuthService = inject(AuthService);
  private toastr: ToastrService = inject(ToastrService);
  private router: Router = inject(Router);

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

  RegisterEffect = createEffect(() => {
    return this.actions$.pipe(
      ofType(Register),
      switchMap((data) =>
        this.authService.register(data.request).pipe(
          map((user: IUser) => {
            this.router.navigate(['/login']);
            this.toastr.success(
              "Opération terminée avec succès. Un email a été envoyé à l'adresse indiquée pour vous permettre de créer un mot de passe"
            );

            return RegisterSuccess({ user });
          }),
          catchError((error: HttpErrorResponse) => {
            const iWsError: IQlError = new QlErrorClass(error);
            return of(
              RegisterError({
                errors: {
                  ...iWsError,
                  messageToShow: 'Register error',
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

  LogoutEffect = createEffect(() => {
    return this.actions$.pipe(
      ofType(Logout),
      map(() => {
        this.router.navigate(['/login']);
        return InitializeAuthState();
      })
    );
  });
}
