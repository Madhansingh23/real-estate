import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import { errorHandler } from "./utils/errorHandler.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("successfully Connected to MongoDB bro!!"))
  .catch((err) => console.log("Database connection error:", err));

const app = express();
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
