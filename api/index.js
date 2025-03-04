import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import { errorHandler } from "./utils/errorHandler.js";
import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(()=>console.log("successfully Connected to MongoDB bro!!"))
  .catch((err)=>console.log("Database connection error:",err));

const app=express();
app.use(express.json());
app.use(cookieParser());

app.listen(3000,()=>{
  console.log("Server is running on port 3000");
}); 

app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);
// app.use('/api/listing', listingRouter);


app.use(errorHandler);
// app.use(express.static(path.join(__dirname, '/client/dist')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// })

app.use((err,req,res,next)=>{
const statusCode=err.statusCode||500;
const message=err.message||'Internal Server Message';
return res.status(statusCode).json({
  success:false,
  statusCode,
  message,
});
});

