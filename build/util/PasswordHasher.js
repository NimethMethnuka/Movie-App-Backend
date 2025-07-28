"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
function hashPassword(password, saltRounds) {
    return new Promise((resolve, reject) => {
        bcrypt_1.default.hash(password, saltRounds, (er, hash) => {
            if (er)
                reject(er);
            resolve(hash);
        });
    });
}
exports.default = hashPassword;
