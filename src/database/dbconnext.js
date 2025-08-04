import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(
      process.env.MONGO_URI
    );
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("connected to db");
    });
    connection.on("error", () => {
      console.log("error connecting to db");
      process.exit(1);
    });
  } catch (error) {
    console.log(error);
  }
}
