"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const admin = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Name is required!"],
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
    },
    profilePic: {
        type: String,
    },
}, {
    timestamps: true,
});
const Admin = mongoose_1.default.model("Admin", admin);
exports.default = Admin;
