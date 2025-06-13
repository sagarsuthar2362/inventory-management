import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(
      "mongodb+srv://dbUser:project0@cluster0.bgpzy.mongodb.net/inventory?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => console.log("error occured while connecting to db", err));
};
