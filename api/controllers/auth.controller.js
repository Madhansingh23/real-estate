import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

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
