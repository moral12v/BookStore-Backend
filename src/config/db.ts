const mongoose = require("mongoose");
import { config } from "./config";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("DataBase Url  connected Sucessfully");
    });

    mongoose.connection.on("error", (err: any) => {
      console.log("Connection Failed", err);
    });

    await mongoose.connect(config.databaseUrl as string);
  } catch (err) {
    console.error("faild to connect");
  }
};

export default connectDB;
