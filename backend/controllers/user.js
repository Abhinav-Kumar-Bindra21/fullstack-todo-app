import User from "../models/user.js";
import { email, z } from "zod";
import bcrypt from "bcrypt";
import { generateToken } from "../config/generateToken.js";

const userSchema = z.object({
  username: z.string().min(3, { message: "Username atleat 3 character long" }).max(20),
  email: z.string().email({ message: "Invaild email address" }).max(30),
  password: z.string().min(6, { message: "Password atleast 6 character long" }).max(20),
});

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ errors: "All field are required" });
    }

    const validation = userSchema.safeParse({ username, email, password });

    if (!validation.success) {
      const errorMessage = validation.error.issues.map((e) => e.message);
      return res.status(400).json({ errors: errorMessage });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: "User already registered" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashPassword });
    await newUser.save();

    const token = await generateToken(newUser._id, res);

    res.status(201).json({
      message: "User registered Successfully",
      user: newUser,
      token,
    });
  } catch (error) {
    res.status(400).send("Error is :- " + error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ errors: "Invalid email or password" });
    }

    const user = await User.findOne({ email }).select("password");
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ errors: "Invalid email or password" });
    }

    const token = await generateToken(user._id, res);

    res.status(201).json({ message: "User logged in successfully !!", user, token });
  } catch (error) {
    res.status(400).send("Error is :- " + error);
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      path: "/",
    });

    res.status(200).json({ message: "User logout Successfully !!!" });
  } catch (error) {
    res.status(400).send("Error is :- " + error);
  }
};
