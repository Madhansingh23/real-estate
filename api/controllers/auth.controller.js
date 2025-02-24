import User from "../models/user.model.js";

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already exists!" });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ success: true, message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};
