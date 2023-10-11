"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePasswordWithPrefixAndLength = exports.comparehashPasswords = exports.comparePasswords = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
function hashPassword(plainPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return bcrypt_1.default.hash(plainPassword, 5);
    });
}
exports.hashPassword = hashPassword;
function comparePasswords(hashedPassword, plainPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return bcrypt_1.default.compare(plainPassword, hashedPassword);
    });
}
exports.comparePasswords = comparePasswords;
function comparehashPasswords(hashedPassword, hashedOldPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Compare the two hashed passwords
            const passwordsMatch = yield bcrypt_1.default.compare(hashedOldPassword, hashedPassword);
            return passwordsMatch;
        }
        catch (error) {
            // Handle any errors that may occur during the comparison
            throw error;
        }
    });
}
exports.comparehashPasswords = comparehashPasswords;
function generatePasswordWithPrefixAndLength(length, prefix) {
    const prefixLength = prefix.length;
    if (prefixLength >= length) {
        throw new Error("Total password length is too short for the given prefix.");
    }
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?";
    const remainingLength = length - prefixLength;
    let password = prefix;
    for (let i = 0; i < remainingLength; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset.charAt(randomIndex);
    }
    return password;
}
exports.generatePasswordWithPrefixAndLength = generatePasswordWithPrefixAndLength;
