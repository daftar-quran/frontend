import { HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import {
  catchError,
  filter,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { IAuthenticationResult } from '@app/models';
import { Store } from '@ngrx/store';
import {
  selectJwtTokens,
  selectRefreshTokenInProgress,
} from '../store/auth/auth.selectors';
import { RefreshToken } from '../store/auth/auth.actions';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>(null);
  private takeUntilSubject: Subject<boolean> = new Subject<boolean>();
  private accessToken: string = null;
  private refreshToken: string = null;
  private publicUrls = ['REFRESH_TOKEN', 'USER_PASSWORD_AUTH'];

  constructor(private store: Store) {
    this.store
      .select(selectJwtTokens)
      .pipe(
        filter(
          (jwtTokens: IAuthenticationResult) =>
            !this.accessToken || this.accessToken !== jwtTokens.IdToken
        ),
        tap((jwtTokens: IAuthenticationResult) => {
          this.accessToken = jwtTokens.IdToken;
          this.refreshToken = jwtTokens.RefreshToken;
          this.refreshTokenSubject.next(this.accessToken);
        })
      )
      .subscribe();
    this.store
      .select(selectRefreshTokenInProgress)
      .subscribe((refreshTokenInProgress: boolean) => {
        this.refreshTokenInProgress = refreshTokenInProgress;
      });
  }
  // tslint:disable-next-line:no-any
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<Object>> {
    let authReq = req;
    if (!!this.accessToken && !this.isPublicUrl(authReq)) {
      authReq = this.addTokenHeader(req, this.accessToken);
    }
    return next.handle(authReq).pipe(
      catchError((error) => {
        if (
          !this.isPublicUrl(authReq) &&
          error instanceof HttpErrorResponse &&
          error.status === 401
        ) {
          return this.handle401Error(authReq, next);
        }

        if (authReq.body?.AuthFlow.includes('REFRESH_TOKEN')) {
          this.takeUntilSubject.next(true);
        }
        return throwError(error);
      })
    );
  }

  /**
   * mise à jour du accessToken à l'aide du refreshToken lors de la réception d'une HttpResponse avec le code d'erreur 401
   * @param request
   * @param next
   * @return Observable<string>
   * @private
   */
  // tslint:disable-next-line:no-any
  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.refreshTokenInProgress) {
      this.refreshTokenSubject.next(null);
      console.log('handle401Error');
      this.store.dispatch(RefreshToken());
    }
    return this.refreshTokenSubject.pipe(
      filter((accessToken: string) => !!accessToken),
      take(1),
      takeUntil(this.takeUntilSubject),
      switchMap((accessToken: string) =>
        next.handle(this.addTokenHeader(request, accessToken))
      )
    );
  }

  /**
   * Ajout du token dans le header de la request
   * @param request
   * @param token
   * @return HttpRequest<any>
   * @private
   */
  // tslint:disable-next-line:no-any
  private addTokenHeader(
    request: HttpRequest<any>,
    token: string
  ): HttpRequest<any> {
    return request.clone({
      headers: request.headers.set('Authorization', `: Bearer ${token}`),
    });
  }

  /**
   * vérifie si la requete est public
   * @param request
   * @return boolean
   * @private
   */
  // tslint:disable-next-line:no-any
  private isPublicUrl(request: HttpRequest<any>): boolean {
    return this.publicUrls.some(
      (element: string) => request.body?.AuthFlow.includes(element)
    );
  }
}
