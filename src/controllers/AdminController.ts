import express, { Express, Request, Response } from "express";
import { authenticateToken, generateJWT } from "../auth/Auth";
import Admin from "../models/Admin";
import bcrypt from "bcrypt";
import hashPassword from "../util/PasswordHasher";

const adminController = express.Router();

adminController.use(express.json());
adminController.post("/signup", async (req: Request, res: Response) => {
  try {
    let hashedPW = await hashPassword(req.body.password, 10);
    req.body.password = hashedPW;
    await Admin.create(req.body);
    return generateJWT(req, res, req.body);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});
adminController.get(
  "/search",

  async (req: Request, res: Response) => {
    try {
      let adminsList = await Admin.find({ email: req.query.email });
      if (adminsList.length > 0) {
        return res
          .status(200)
          .json({ msg: "Admin Found!", data: adminsList, isExists: true });
      } else {
        return res
          .status(200)
          .json({ msg: "Admin Not Found!", data: null, isExists: false });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);
adminController.delete(
  "/delete",

  async (req: Request, res: Response) => {
    try {
      let response = await Admin.findOneAndDelete({ email: req.query.email });
      if (response) {
        return res
          .status(200)
          .json({ msg: "Admin Deleted Successfully!", isDeleted: true });
      } else {
        return res
          .status(200)
          .json({ msg: "Admin Not Found!", isDeleted: false });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

adminController.post(
  "/login",
  
  async (req: Request, res: Response) => {
    try {
      let admin = await Admin.findOne({ email: req.body.email });
      let userPW:string = req.body.password as string;
      let pw :string = admin?.password as string;
      bcrypt.compare(userPW, pw, (err, result) => {
        if (err) {
          return res.status(401).json({ message: "Auth Failed" });
        }
        if (result) {
          return res.status(200).json({isAuthorized : true,message :"Authorized"});
        }
        return res.status(200).json({ message: "Auth Failed!" });
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);
adminController.get("/getAll", async (req: Request, res: Response) => {
  try {
    let response = await Admin.find({});
    return res.status(200).json(response);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

export default adminController;
