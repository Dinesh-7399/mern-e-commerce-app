import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();
const connectDB = async () => {
  // i know it's a bad practice but it doesn't work so 
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('succesfully connected to mongodb');
  } catch (error) {
    console.error(`Connection failed Error :- ${error.message}`);
    process.exit(1);
  }
}
export default connectDB
// so i will work in cloud and huxn in local 

