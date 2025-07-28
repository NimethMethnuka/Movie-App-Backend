import mongoose from "mongoose";
const admin = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  }
);
const Admin = mongoose.model("Admin", admin);
export default Admin;
