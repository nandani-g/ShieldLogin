import mongoose from "mongoose"; // 👈 make sure this is still there

const connectDB = async () => {
 console.log("URL from env:", process.env.MONGODB_URI);
  mongoose.connection.on('connected', () => console.log("Database connected"));
 await mongoose.connect(`${process.env.MONGODB_URI}/shieldLogin`);
};

export default connectDB;