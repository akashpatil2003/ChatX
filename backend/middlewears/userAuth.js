import { JWT_SECRET } from '../../config.js';
import UserModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';

export const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(400).json({ error: "Unauthorized: Provide a token" })
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "Invalid Token" })
    }

    const user = await UserModel.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(`Error while authorizing user, ${error.message}`);
    res.status(500).json({ error: "Internal server error" })
  }
}