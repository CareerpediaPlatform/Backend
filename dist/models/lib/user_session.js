"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSession = void 0;
class UserSession {
    constructor(userId, role, userName, permissions) {
        this.userId = userId;
        this.role = role;
        this.userName = userName;
        this.permissions = permissions;
    }
}
exports.UserSession = UserSession;
