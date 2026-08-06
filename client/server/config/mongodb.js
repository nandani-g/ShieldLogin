// write a function which is connect to database

import mongoose from "mongoose";

const connectDB = async ()=> {

  mongoose.connection.on('connected', ()=>console.log("Database connected"));
  await mongoose.connect(`${process.env.MONGODB_URL}/shieldLogin`);
};


export default connectDB;