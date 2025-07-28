import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
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
    watchLaterList : {
      type: [Number],
      default: [],
    }
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
export default User;
