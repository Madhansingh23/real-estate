import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import { errorHandler } from "./utils/errorHandler.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(()=>console.log("successfully Connected to MongoDB bro!!"))
  .catch((err)=>console.log("Database connection error:",err));

const app=express();
app.use(express.json());

app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);

// app.use((err,req,res,next)=>{
// const statusCode=err.statusCode||500;
// const message=err.message||'Internal Server Message';
// return res.status(statusCode).json({
//   success:false,
//   statusCode,
//   message,
// });
// });
app.use(errorHandler);

app.listen(3000,()=>{
  console.log("Server is running on port 3000");
});
