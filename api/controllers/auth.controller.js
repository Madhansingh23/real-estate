import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/errorHandler.js";
import jwt from 'jsonwebtoken';

export const signup=async(req,res,next)=>{
  try {
    const {username,email,password}=req.body;
    // Hash the password before saving
    const hashedPassword=await bcrypt.hash(password, 10);

    // Check if user already exists
    const existingUser=await User.findOne({email});
    if(existingUser){
      return res.status(400).json({success:false, message:"Email already exists bro!" });
    }

    const newUser=new User({ 
      username, 
      email, 
      password: hashedPassword // Store hashed password
    });

    await newUser.save();

    res.status(201).json({success:true, message:"User created successfully bro!!" });
  } catch(error){
    // res.status(500).json(error.message);
    next(error);
  }
};


export const signin=async(req,res,next)=>{
  const {email,password}=req.body;
  // Check if fields are missing
  if (!email || !password) {
    return next(errorHandler(400, "Email and password are required"));
  }
  try{
    const validUser=await User.findOne({email});
    if(!validUser)
      return next(errorHandler(404,'User Not Found'));
    const validPassword=bcrypt.compareSync(password,validUser.password);
    if(!validPassword)
      return next(errorHandler(401,"Wrong Credentials"));
    const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET,{expiresIn:"1d"});
    // const token = jwt.sign({ id: validUser._id }, "myhardcodedsecret", { expiresIn: "1d" });
    const {password:pass,...rest}=validUser._doc;
    res
    .cookie('access_token',token,{httpOnly:true})
    .status(200)
    .json(rest);
  }
  catch(error)
  {
    next(error);
  }
}