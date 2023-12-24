import { environment } from '../../../../environments/environment';

export interface ILogin {
  USERNAME: string;
  PASSWORD: string;
}

export interface ILoginRequest {
  AuthParameters: ILogin;
  AuthFlow: string;
  ClientId: string;
}

export class LoginRequest implements ILoginRequest {
  AuthParameters: ILogin;
  AuthFlow: string;
  ClientId: string;
  constructor(login: ILogin) {
    this.AuthParameters = login;
    this.AuthFlow = 'USER_PASSWORD_AUTH';
    this.ClientId = environment.ClientId;
  }
}
