import express, { Express,Request,Response } from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userController from "./controllers/UserController";
import adminController from './controllers/AdminController'
import cors from 'cors';

dotenv.config();

const app: Express = express();
app.use(cors());
app.use('/user',userController)
app.use('/admin',adminController)

app.listen(3000,()=>{
  console.log('Server Started at Port 3000!')
})

mongoose.connect("mongodb+srv://damianpeiris:"+process.env.MONGODB_PASSWORD+"@streamzdb.qcqbh9t.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
  console.log("Connected to database!")
}).catch((err) => {
  console.log("Something went wrong!");
  console.log(JSON.stringify(err, Object.getOwnPropertyNames(err), 2));
});



