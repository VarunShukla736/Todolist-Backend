import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const validatePassword = (password) => {
  if (typeof password !== "string") return "Password must be a string";
  const trimmed = password.trim();
  const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
  if (!strongPasswordPattern.test(trimmed)) {
    return "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character";
  }
  return null;
};

const validateRegisterInput = ({ name, email, password }) => {
  if (!name || !email || !password) {
    return "Name, email and password are required";
  }

  if (typeof name !== "string" || typeof email !== "string" || typeof password !== "string") {
    return "Name, email and password must be strings";
  }

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();

  if (!trimmedName) return "Name must not be empty";
  if (!trimmedEmail) return "Email must not be empty";

  if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
    return "Email must be a valid email address";
  }

  const passwordError = validatePassword(password);
  if (passwordError) return passwordError;

  return null;
};

// SIGNUP
export const registerUser = async (req, res) => {
  let { name, email, password } = req.body;

  const validationError = validateRegisterInput({ name, email, password });
  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  name = name.trim();
  email = email.trim();

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
};

// LOGIN
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const trimmedEmail = email.trim();
  const trimmedPassword = password.trim();

  if (!trimmedEmail || !trimmedPassword) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  if (typeof email !== "string" || typeof password !== "string") {
    return res.status(400).json({ message: "Email and password must be strings" });
  }

  const user = await User.findOne({ email: trimmedEmail });
  
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};