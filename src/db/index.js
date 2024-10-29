import mongoose from "mongoose"
import dotenv from "dotenv"
import {DB_NAME} from "../constant.js"

dotenv.config();

const connectDB=async()=>{
    try{
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`);
       console.log(`\n MONGO DB CONNECT!!
       DBHOST :${connectionInstance.connection.host}`)
    }
    catch(error){
        console.log("MONGO DB CONNECTION ERROR", error);
        process.exit(1);
    }
}

export default connectDB;