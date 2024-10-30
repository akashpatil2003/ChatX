import express from "express";
import authRoutes from "./routes/authRoutes.js";
import connectMongo from "./db/connectMongo.js";
import dotenv from 'dotenv'
dotenv.config()
const app = express();

app.use('/api/auth', authRoutes)
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  connectMongo();
})