import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IJwtTokens, IUser } from '@app/models';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ILogin, LoginRequest, RefreshTokenRequest } from './models';

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
      `${environment.authUrl}`,
      new LoginRequest(data),
      { headers: this.headers }
    );
  }

  /**
   * enregistrer un nouvel utilisateur
   * @param data <IUser>
   * @return Observable<IUser>
   */
  public register(data: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${environment.apiUrl}/users`, data);
  }

  /**
   * récuperer un nouveau accessToken à l'aide du refreshToken
   * @param refresh_token
   * @return Observable<IRefreshTokenResponse>
   */
  refreshToken(refresh_token: string): Observable<IJwtTokens> {
    return this.http.post<IJwtTokens>(
      `${environment.authUrl}`,
      new RefreshTokenRequest(refresh_token),
      { headers: this.headers }
    );
  }

  /**
   * get current user data
   * @param data <IUser>
   * @return Observable<IUser>
   */
  public me(): Observable<IUser> {
    return this.http.get<IUser>(`${environment.apiUrl}/me`);
  }
}
