import mongoose from "mongoose";
import { MONGO_URL } from '../../config.js'

const connectMongo = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL)
    console.log("connected to mongodb");

  } catch (error) {
    console.log(`Error connecting db: ${error.message}`);
    process.exit(1);
  }
}

export default connectMongo;