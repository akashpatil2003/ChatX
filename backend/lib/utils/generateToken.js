import jwt from 'jsonwebtoken';
import { JWT_SECRET, NODE_ENV } from '../../../config.js';

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: '15d'
  })

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'strict',
    secure: NODE_ENV !== 'development'
  })
}