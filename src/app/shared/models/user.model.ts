export interface IUser {
  id?: number;
  actif?: boolean;
  pseudo: string;
  firstname: string;
  lastname: string;
  email: string;
  is_admin?: boolean;
  mobile?: string;
  birthdate: string;
}

export class User implements IUser {
  id: number;
  actif: boolean;
  pseudo: string;
  firstname: string;
  lastname: string;
  email: string;
  is_admin: boolean;
  mobile: string;
  birthdate: string;

  constructor() {
    this.id = null;
    this.firstname = null;
    this.lastname = null;
    this.email = null;
    this.mobile = null;
    this.actif = false;
    this.pseudo = null;
    this.birthdate = null;
    this.is_admin = false;
  }
}
