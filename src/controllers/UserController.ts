import express, { Express, Request, Response, response } from "express";
import { generateJWT, authenticateToken } from "../auth/Auth";
import User from "../models/User";
import UserType from "../types/UserTypes";
const userController = express.Router();
userController.use(express.json());

userController.post("/saveUser", async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const data = await User.create(req.body);
    return generateJWT(req, res, req.body);
  } catch (error) {
    return res
      .status(200)
      .json({ msg: "An error occurred!" + error, isSaved: false });
  }
});

userController.get("/search", async (req: Request, res: Response) => {
  try {
    const email: string =
      typeof req.query.email === "string" ? req.query.email : "";
    const usersList = await User.find({ email });
    if (usersList.length > 0) {
      console.log("User Found!");
      return res.status(200).json({
        msg: "User Successfully retrieved!",
        data: usersList,
        isExists: true,
      });
    } else {
      console.log("User Not found!");
      return res
        .status(200)
        .json({ msg: "User not found!", data: null, isExists: false });
    }
  } catch (error) {
    console.log("An error occurred : " + error);
    return res.status(500).json({
      msg: "Something went wrong : " + error,
      data: null,
      isExists: false,
    });
  }
});
userController.put(
  "/update",
 
  async (req: Request, res: Response) => {
    console.log(req.body.profilePic)
    const user: UserType = {
      name: req.body.name,
      email: req.body.email,
      profilePic: req.body.profilePic,
      favouriteList: req.body.favouriteList,
      historyList: req.body.historyList,
      watchLaterList: req.body.watchLaterList,
    };
    try {
      let data = await User.findOneAndUpdate({ email: user.email }, user);
      console.log('Updated : ',data)
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
    } catch (error) {
      res.status(500).json({
        msg: "Something went wrong : " + error,
        isUpdated: false,
        data: null,
      });
    }
  }
);
userController.get(
  "/getAll",
 
  async (req: Request, res: Response) => {
    try {
      let response = await User.find({});
      return res.status(200).json({
        msg: "Users retrieved successfully!",
        data: response,
        isExists: true,
      });
    } catch (error: any) {
      return res.status(500).json({
        msg: "Something went wrong : " + error,
        data: null,
        isExists: false,
      });
    }
  }
);
userController.delete("/delete", async (req: Request, res: Response) => {
  try {
    let Response = await User.findOneAndDelete({email:req.query.email})
    if(response){
      return res.status(200).json({msg:"User deleted successfully!",isDeleted:true})
    }
    else{
      return res.status(200).json({msg:"User not found!",isDeleted:false})
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

export default userController;
