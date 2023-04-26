import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const dbConnect = (): void => {
  try {
    const conn = mongoose.connect(process.env.MONGODB_URL as string);
    console.log("Database Connected successfully");
  } catch (error) {
    console.log("Database Error");
  }
};

export default dbConnect;
