import UserModel from "../models/userModel.js"
import bcrypt from "bcryptjs"
import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, email, password } = req.body;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({ error: "Invalid email format" })
    }

    //chech if user exists
    const exstUser = await UserModel.findOne({ username });
    if (exstUser) {
      return res.json({ error: "username already exists" })
    }

    const exstEmail = await UserModel.findOne({ email });
    if (exstEmail) {
      return res.json({ error: "Email already exists" })
    }

    if (password.length < 8) {
      return res.status(400).json({ error: "Password length must be minimum 8 characters" })
    }
    //hash password
    const hashedPass = await bcrypt.hash(password, 10);

    const user = new UserModel({
      fullName,
      username,
      email,
      password: hashedPass
    })

    if (user) {
      generateTokenAndSetCookie(user._id, res)
      await user.save();

      res.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        followers: user.followers,
        following: user.following,
        profileImg: user.profileImg,
        coverImg: user.coverImg
      })
    } else {
      res.status(400).json({ error: "Invalid user data" })
    }
  } catch (error) {
    console.log(`Error: ${error.message} `);
    res.status(500).json({ error: `Internal server error` })
  }
}

export const login = async (req, res) => {
  try {

    const { username, password } = req.body;
    //find the user
    const user = await UserModel.findOne({ username });
    const correctPass = await bcrypt.compare(password, user?.password || "");

    if (!user || !correctPass) {
      return res.status(400).json({ error: "invalid credentials" })
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      followers: user.followers,
      following: user.following,
      profileImg: user.profileImg,
      coverImg: user.coverImg
    })
  } catch (error) {
    console.log(`Error: ${error.message} `);
    res.status(500).json({ error: `Internal server error` })
  }
}

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 })
    res.status(200).json({ message: "LoggedOut Successfully" })
  } catch (error) {
    console.log(`Error: ${error.message} `);
    res.status(500).json({ error: `Internal server error` })
  }
}

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id).select("-password");
    res.status(200).json(user)
  } catch (error) {
    console.log("Error in get me authController", error.message);
    res.status(500).json({ error: "Internal server error" })
  }
}