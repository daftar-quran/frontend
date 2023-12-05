export interface IUser {
  id: number;
  actif: boolean;
  first_name: string;
  last_name: string;
  email: string;
  login: string;
  mobile: string;
  date_of_birth: string;
}

export class User implements IUser {
  id: number;
  actif: boolean;
  first_name: string;
  last_name: string;
  email: string;
  login: string;
  mobile: string;
  date_of_birth: string;

  constructor() {
    this.id = null;
    this.first_name = null;
    this.last_name = null;
    this.email = null;
    this.mobile = null;
    this.actif = false;
    this.login = null;
    this.date_of_birth = null;
  }
}
