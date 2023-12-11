"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.College = exports.Recruiter = exports.Mentor = exports.Admin = exports.Otp = exports.ISignin = exports.User = void 0;
class User {
    constructor(id, uid, firstName, lastName, email, role, uuid, accessToken, password) {
        this.id = id;
        this.uid = uid;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.role = role;
        this.accessToken = accessToken;
        this.uuid = uuid;
    }
}
exports.User = User;
class ISignin {
    constructor(phoneNumber, email, uuid, status) {
        this.phoneNumber = phoneNumber;
        this.uuid = uuid;
        this.email = email;
        this.status = status;
    }
}
exports.ISignin = ISignin;
class Otp {
    constructor(student_id, phoneNumber, accessToken, type, otp, createdAt, id) {
        this.student_id = student_id;
        this.otp = otp;
        this.phoneNumber = phoneNumber;
        this.type = type;
        this.createdAt = createdAt;
        this.id = id;
        this.accessToken = accessToken;
    }
}
exports.Otp = Otp;
class Admin {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
}
exports.Admin = Admin;
class Mentor {
    constructor(email, password, type, course, status) {
        this.email = email;
        this.password = password;
        this.type = type;
        this.course = course;
        this.status = status;
    }
}
exports.Mentor = Mentor;
class Recruiter {
    constructor(email, password, status) {
        this.email = email;
        this.password = password;
        this.status = status;
    }
}
exports.Recruiter = Recruiter;
class College {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
}
exports.College = College;
