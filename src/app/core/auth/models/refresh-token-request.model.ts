import { environment } from '../../../../environments/environment';

export interface IRefreshToken {
  REFRESH_TOKEN: string;
}

export interface IRefreshtokenRequest {
  AuthParameters: IRefreshToken;
  AuthFlow: string;
  ClientId: string;
}

export class RefreshTokenRequest implements IRefreshtokenRequest {
  AuthParameters: IRefreshToken;
  AuthFlow: string;
  ClientId: string;
  constructor(refreshToken: string) {
    this.AuthParameters = { REFRESH_TOKEN: refreshToken };
    this.AuthFlow = 'REFRESH_TOKEN';
    this.ClientId = environment.ClientId;
  }
}
