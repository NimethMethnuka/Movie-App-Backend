"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Name is required!"],
    },
    email: {
        type: String,
        required: [true, "Username is required!"],
        unique: true,
    },
    profilePic: {
        type: String,
        unique: true,
    },
    favouriteList: {
        type: [Number],
        default: [],
    },
    historyList: {
        type: [Number],
        default: [],
    },
    watchLaterList: {
        type: [Number],
        default: [],
    }
}, {
    timestamps: true,
});
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
