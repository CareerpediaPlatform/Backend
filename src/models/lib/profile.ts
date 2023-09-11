export interface IcollegeProfile{
    instituteName:string,
    founderName:string,
    email:string,
    phoneNumber: string,
    website: string,
    linkedInProfile: string,
  }
  

  export class CollegeProfile implements IcollegeProfile {
    public userID?:string
    public instituteName:string
    public founderName:string
    public email:string
    public phoneNumber: string
    public website: string
    public linkedInProfile: string

    constructor (
        instituteName:string,
        founderName:string,
        email:string,
        phoneNumber: string,
        website: string,
        linkedInProfile: string,) {
  
            this.instituteName=instituteName
            this.founderName=founderName
            this.email=email
            this.phoneNumber=phoneNumber
            this.website=website
            this.linkedInProfile=linkedInProfile
    }
  }