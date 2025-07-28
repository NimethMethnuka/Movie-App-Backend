"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = exports.generateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function generateJWT(request, response, user) {
    const jwtToken = jsonwebtoken_1.default.sign(user, process.env.JWT_ACCESS_TOKEN_SECRET);
    return response.json({ jwt: jwtToken, isSaved: true, msg: "User Saved Successfully!" });
}
exports.generateJWT = generateJWT;
function authenticateToken(req, res, next) {
    const authHeader = req.header('Authorization');
    const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1];
    if (token == null)
        return res.status(401).json({ "msg": "Token not found!" });
    jsonwebtoken_1.default.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, user) => {
        if (err)
            return res.status(403).json({ "msg": "Token not verified!", err });
        // Making user info available in the next middleware.
        req.body.user = user;
        next();
    });
}
exports.authenticateToken = authenticateToken;
module.exports = { generateJWT, authenticateToken };
