export interface IUser {
  id?: string;
  uid?: string;
  email: string;
  password: string;
}

export class User implements IUser {
  public id?: string;
  public uid?: string;
  public email: string;
  public password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
