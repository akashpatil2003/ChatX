import express from "express";
import authRoutes from "./routes/authRoutes.js";
import connectMongo from "./db/connectMongo.js";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes)

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  connectMongo();
})