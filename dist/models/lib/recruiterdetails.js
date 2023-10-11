"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecruiterProfile = exports.Recruiter = void 0;
class Recruiter {
    constructor(UserId, UId, email, password) {
        this.UserId = UserId;
        this.UId = UId;
        this.email = email;
        this.password = password;
    }
}
exports.Recruiter = Recruiter;
class RecruiterProfile {
    constructor(UserId, UId, logo, companyName, founderName, phoneNmber, websiteUrl, linkedInUrl) {
        this.UserId = UserId;
        this.UId = UId;
        this.companyName = companyName;
        this.founderName = founderName;
        this.phoneNumber = phoneNmber;
        this.websiteUrl = websiteUrl;
        this.linkedInUrl = linkedInUrl;
    }
}
exports.RecruiterProfile = RecruiterProfile;
