import dotenv from 'dotenv'
dotenv.config();

const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT
const JWT_SECRET = process.env.JWT_SECRET
const NODE_ENV = process.env.NODE_ENV
export {
  MONGO_URL,
  PORT,
  JWT_SECRET,
  NODE_ENV
};