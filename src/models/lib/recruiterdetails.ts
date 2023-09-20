
//recruiter
export interface IRecruiter {
    UserId: string;
    UId?: string;
    email: string;
    password: string;
      
  }
  
  export class Recruiter implements IRecruiter {
    public UserId: string;
    public UId?: string;
    public email: string;
    public password: string;
    
  
    constructor(UserId: string,UId: string, email: string, password: string, ) {
      this.UserId=UserId;
      this.UId=UId;
      this.email = email;
      this.password = password;
      
      
    }
  }
    //recruiter Profile
    export interface IRecruiterProfile {
        UserId: string;
        UId?: string;
        logo: string;
        companyName: string;
        founderName:string;
        phoneNumber:string;
        websiteUrl:string;
        linkedInUrl:string;
               
      }
      
      export class RecruiterProfile implements IRecruiterProfile {
        public UserId: string;
        public UId?: string;
        public email: string;
        public password: string;
        public logo: string;
        public companyName: string;
        public founderName: string;
        public phoneNumber: string;
        public websiteUrl: string;
        public linkedInUrl: string;
          
        constructor(UserId: string, UId: string, logo:string, companyName:string, founderName:string, phoneNmber:string,websiteUrl:string, linkedInUrl:string) {
          this.UserId=UserId;
          this.UId=UId;
            this.companyName = companyName;
          this.founderName = founderName;
          this.phoneNumber = phoneNmber;
          this.websiteUrl = websiteUrl;
          this.linkedInUrl = linkedInUrl;
          
        }
      }


  