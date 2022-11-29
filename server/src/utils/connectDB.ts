import mongoose from "mongoose";

export const connect = async (uri: string) => {
  await mongoose.connect(uri);
  console.log("🌿 Connected to MongoDB");
};
