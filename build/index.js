"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const UserController_1 = __importDefault(require("./controllers/UserController"));
const AdminController_1 = __importDefault(require("./controllers/AdminController"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use('/user', UserController_1.default);
app.use('/admin', AdminController_1.default);
app.listen(3000, () => {
    console.log('Server Started at Port 3000!');
});
mongoose_1.default.connect("mongodb+srv://damianpeiris:" + process.env.MONGODB_PASSWORD + "@streamzdb.qcqbh9t.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
    console.log("Connected to database!");
}).catch((er) => {
    console.log("Something went wrong! : " + er);
});
