import { connect } from "mongoose";
import { MONGO_URI } from "../config/config";

export const mongoConn = async (): Promise<string> => {
  try {
    await connect(MONGO_URI as string);
    return "MongoDB connected";
  } catch (error) {
    console.log(error);
    return "Error connecting to MongoDB";
  }
};
