import { inject, Injectable } from '@angular/core';
import { ILogin, LoginRequest, RefreshTokenRequest } from './models';
import { Observable } from 'rxjs';
import { IJwtTokens } from '@app/models';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http: HttpClient = inject(HttpClient);
  private headers: HttpHeaders = new HttpHeaders()
    .set('X-Amz-Target', 'AWSCognitoIdentityProviderService.InitiateAuth')
    .set('Content-Type', 'application/x-amz-json-1.1');

  /**
   * connecter l'utilisateur
   * @param data <ILogin>
   * @return Observable<IJwtTokens>
   */
  public login(data: ILogin): Observable<IJwtTokens> {
    return this.http.post<IJwtTokens>(
      `${environment.apiUrl}`,
      new LoginRequest(data),
      { headers: this.headers }
    );
  }

  /**
   * récuperer un nouveau accessToken à l'aide du refreshToken
   * @param refresh_token
   * @return Observable<IRefreshTokenResponse>
   */
  refreshToken(refresh_token: string): Observable<IJwtTokens> {
    return this.http.post<IJwtTokens>(
      `${environment.apiUrl}`,
      new RefreshTokenRequest(refresh_token),
      { headers: this.headers }
    );
  }
}
