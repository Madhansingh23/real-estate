import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/errorHandler.js";
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) { // Check if all fields are provided
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email }); // Check if user already exists
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already exists bro!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password before saving

    const newUser = new User({ 
      username, 
      email, 
      password: hashedPassword // Store hashed password
    });

    await newUser.save(); // Save the user details

    res.status(201).json({ success: true, message: "User created successfully bro!!" }); // On successful user creation
  } catch (error) {
    console.error("Signup Error:", error); // Logs error in backend for debugging
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) // Check presence of email and password
  {
    return next(errorHandler(400, "Email and password are required"));
  }
  try {
    const validUser = await User.findOne({ email }); // To find the email with id
    if (!validUser) // Check for user
      return next(errorHandler(404, "Email not found")); // Send clear error message

    const validPassword = bcrypt.compareSync(password, validUser.password); // To compare the hashed password
    if (!validPassword) // Check validity
      return next(errorHandler(401, "Incorrect password")); // Send clear error message

    if (!process.env.JWT_SECRET) { // Ensure JWT secret is defined
      return next(errorHandler(500, "JWT Secret is missing"));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    const { password: pass, ...rest } = validUser._doc; // To avoid password in displaying the correctness

    res
      .cookie("access_token", token, { httpOnly: true }) // To create a cookie access
      .status(200)
      .json({ success: true, ...rest }); // Ensure { success: true } is returned
  } catch (error) {
    console.error("Signin Error:", error); // Logs error in backend for debugging
    next(error);
  }
};
