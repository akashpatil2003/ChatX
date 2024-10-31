import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  fullName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  followers: [
    {
      type: ObjectId,
      ref: "User",
      default: []
    }
  ],
  following: [
    {
      type: ObjectId,
      ref: "User",
      default: []
    }
  ],
  profileImg: {
    type: String,
    default: ""
  },
  coverImg: {
    type: String,
    default: ""
  },
  bio: {
    type: String,
    default: ""
  },
  link: {
    type: String,
    default: ""
  }
}, { timestamps: true })

const UserModel = mongoose.model("user", userSchema);

export default UserModel;