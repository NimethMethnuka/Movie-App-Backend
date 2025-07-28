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
const express_1 = __importDefault(require("express"));
const Auth_1 = require("../auth/Auth");
const Admin_1 = __importDefault(require("../models/Admin"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const PasswordHasher_1 = __importDefault(require("../util/PasswordHasher"));
const adminController = express_1.default.Router();
adminController.use(express_1.default.json());
adminController.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let hashedPW = yield (0, PasswordHasher_1.default)(req.body.password, 10);
        req.body.password = hashedPW;
        yield Admin_1.default.create(req.body);
        return (0, Auth_1.generateJWT)(req, res, req.body);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}));
adminController.get("/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let adminsList = yield Admin_1.default.find({ email: req.query.email });
        if (adminsList.length > 0) {
            return res
                .status(200)
                .json({ msg: "Admin Found!", data: adminsList, isExists: true });
        }
        else {
            return res
                .status(200)
                .json({ msg: "Admin Not Found!", data: null, isExists: false });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
adminController.delete("/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let response = yield Admin_1.default.findOneAndDelete({ email: req.query.email });
        if (response) {
            return res
                .status(200)
                .json({ msg: "Admin Deleted Successfully!", isDeleted: true });
        }
        else {
            return res
                .status(200)
                .json({ msg: "Admin Not Found!", isDeleted: false });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
adminController.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let admin = yield Admin_1.default.findOne({ email: req.body.email });
        let userPW = req.body.password;
        let pw = admin === null || admin === void 0 ? void 0 : admin.password;
        bcrypt_1.default.compare(userPW, pw, (err, result) => {
            if (err) {
                return res.status(401).json({ message: "Auth Failed" });
            }
            if (result) {
                return res.status(200).json({ isAuthorized: true, message: "Authorized" });
            }
            return res.status(200).json({ message: "Auth Failed!" });
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
adminController.get("/getAll", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let response = yield Admin_1.default.find({});
        return res.status(200).json(response);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}));
exports.default = adminController;
