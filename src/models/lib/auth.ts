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

//admin
export interface IAdmin {
  id?: string;
  uid?: string;
  email: string;
  password: string;
}

export class Admin implements IAdmin {
  public id?: string;
  public uid?: string;
  public email: string;
  public password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

//mentor
export interface IMentor {
  id?: string;
  uid?: string;
  email: string;
  password: string;
}

export class Mentor implements IMentor {
  public id?: string;
  public uid?: string;
  public email: string;
  public password: string;
  
  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

//recruiter
export interface IRecruiter {
  id?: string;
  uid?: string;
  email: string;
  password: string;
}

export class Recruiter implements IRecruiter {
  public id?: string;
  public uid?: string;
  public email: string;
  public password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

//college_admin

export interface ICollege {
  id?: string;
  uid?: string;
  email: string;
  password: string;
}

export class College implements ICollege {
  public id?: string;
  public uid?: string;
  public email: string;
  public password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}