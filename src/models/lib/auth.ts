import { string } from "joi"

export interface IUser {
  uid: string
  firstName: string
  lastName: string
  email: string
  password?:string
  phoneNumber: string
  role: string
  uuid?:string
  accessToken?:string
}

export class User implements IUser {
  public uid: string
  public firstName: string
  public lastName: string
  public email: string
  public phoneNumber: string
  public role: string
  public uuid?:string
   public password?:string
  public accessToken?:string

  constructor ( 
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    role: string,
    password?:string,
    uuid?:string,
    accessToken?:string
               ) {

    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.phoneNumber = phoneNumber
    this.role = role
    this.accessToken = accessToken
    this.uuid = uuid
    this.password=password
  }
}


// signim
export interface ISingin{
  email?:string
  password?:string
  uuid?:string
  phoneNumber?:string
}

export class ISignin implements ISingin {
  public email?:string
  public password?:string
  public uuid?:string
  public phoneNumber?:string

 

  constructor (
    phoneNumber:string,
    email?:string,
    uuid?:string) {
    this.phoneNumber = phoneNumber
    this.uuid = uuid
    this.email = email
  }
}

// otp
export interface userOTP{
  id?:string
  student_id:string
  otp:string
  phoneNumber:string
  type:string
  accessToken:string
  createdAt?:string
}

export class Otp implements userOTP {
  public id?: string
  public  student_id: string
  public otp:string
  public phoneNumber:string
  public type:string
  public accessToken:string
  public createdAt?:string

 

  constructor (
    student_id:string,
    phoneNumber:string,
    accessToken:string,
    type:string,
    otp:string,
    createdAt?:string,
    id?:string,) {

    this. student_id =  student_id
    this.otp = otp
    this.phoneNumber = phoneNumber
    this.type = type
    this.createdAt = createdAt
    this.id = id
    this.accessToken=accessToken
  }
}
// 
// 

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
  logo: string;
  companyName: string;
  founderName:string;
  phoneNumber:string;
  websiteUrl:string;
  linkedInUrl:string;
  USER_ID: string;
  
}

export class Recruiter implements IRecruiter {
  public id?: string;
  public uid?: string;
  public email: string;
  public password: string;
  public logo: string;
  public companyName: string;
  public founderName: string;
  public phoneNumber: string;
  public websiteUrl: string;
  public linkedInUrl: string;
  public USER_ID: string;


  constructor(USER_ID: string, email: string, password: string, logo:string, companyName:string, founderName:string, phoneNmber:string,websiteUrl:string, linkedInUrl:string) {
    this.USER_ID=USER_ID;
    this.email = email;
    this.password = password;
    this.logo = logo;
    this.companyName = companyName;
    this.founderName = founderName;
    this.phoneNumber = phoneNmber;
    this.websiteUrl = websiteUrl;
    this.linkedInUrl = linkedInUrl;
    
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