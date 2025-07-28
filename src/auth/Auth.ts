import express, { Express, Request, Response,NextFunction } from "express";
import  jwt  from "jsonwebtoken";
import UserType from '../types/UserTypes'
import dotenv from 'dotenv';
dotenv.config();

export function generateJWT(request: Request, response: Response,user:UserType) {
    const jwtToken = jwt.sign(user,process.env.JWT_ACCESS_TOKEN_SECRET as string);
    return response.json({jwt : jwtToken,isSaved : true,msg :"User Saved Successfully!"});
    
}
export function authenticateToken(req:Request,res:Response,next:NextFunction){
    const authHeader = req.header('Authorization');
    const token = authHeader?.split(' ')[1];
    if(token==null)return res.status(401).json({"msg":"Token not found!"});
    jwt.verify(token,process.env.JWT_ACCESS_TOKEN_SECRET as string,(err,user)=>{
        if(err)return res.status(403).json({"msg":"Token not verified!",err});
        // Making user info available in the next middleware.
        req.body.user = user;
        next();
    })

}
module.exports = {generateJWT,authenticateToken};