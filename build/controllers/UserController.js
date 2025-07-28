"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = __importStar(require("express"));
const Auth_1 = require("../auth/Auth");
const User_1 = __importDefault(require("../models/User"));
const userController = express_1.default.Router();
userController.use(express_1.default.json());
userController.post("/saveUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const data = yield User_1.default.create(req.body);
        return (0, Auth_1.generateJWT)(req, res, req.body);
    }
    catch (error) {
        return res
            .status(200)
            .json({ msg: "An error occurred!" + error, isSaved: false });
    }
}));
userController.get("/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = typeof req.query.email === "string" ? req.query.email : "";
        const usersList = yield User_1.default.find({ email });
        if (usersList.length > 0) {
            console.log("User Found!");
            return res.status(200).json({
                msg: "User Successfully retrieved!",
                data: usersList,
                isExists: true,
            });
        }
        else {
            console.log("User Not found!");
            return res
                .status(200)
                .json({ msg: "User not found!", data: null, isExists: false });
        }
    }
    catch (error) {
        console.log("An error occurred : " + error);
        return res.status(500).json({
            msg: "Something went wrong : " + error,
            data: null,
            isExists: false,
        });
    }
}));
userController.put("/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body.profilePic);
    const user = {
        name: req.body.name,
        email: req.body.email,
        profilePic: req.body.profilePic,
        favouriteList: req.body.favouriteList,
        historyList: req.body.historyList,
        watchLaterList: req.body.watchLaterList,
    };
    try {
        let data = yield User_1.default.findOneAndUpdate({ email: user.email }, user);
        console.log('Updated : ', data);
        if (data)
            res.status(200).json({
                msg: "User updated successfully!",
                isUpdated: true,
                data: data,
            });
        else
            res
                .status(200)
                .json({ msg: "User not found!", isUpdated: false, data: null });
    }
    catch (error) {
        res.status(500).json({
            msg: "Something went wrong : " + error,
            isUpdated: false,
            data: null,
        });
    }
}));
userController.get("/getAll", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let response = yield User_1.default.find({});
        return res.status(200).json({
            msg: "Users retrieved successfully!",
            data: response,
            isExists: true,
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: "Something went wrong : " + error,
            data: null,
            isExists: false,
        });
    }
}));
userController.delete("/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let Response = yield User_1.default.findOneAndDelete({ email: req.query.email });
        if (express_1.response) {
            return res.status(200).json({ msg: "User deleted successfully!", isDeleted: true });
        }
        else {
            return res.status(200).json({ msg: "User not found!", isDeleted: false });
        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}));
exports.default = userController;
