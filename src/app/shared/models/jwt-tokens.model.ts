export interface IAuthenticationResult {
  AccessToken: string;
  ExpiresIn: number;
  IdToken: string;
  RefreshToken: string;
  TokenType: string;
}
export interface IJwtTokens {
  AuthenticationResult: IAuthenticationResult;
}

export class JwtTokens implements IJwtTokens {
  AuthenticationResult: IAuthenticationResult;

  constructor() {
    this.AuthenticationResult = {
      AccessToken: null,
      ExpiresIn: null,
      IdToken: null,
      RefreshToken: null,
      TokenType: null,
    };
  }
}
