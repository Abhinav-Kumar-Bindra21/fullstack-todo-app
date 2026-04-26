import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const generateToken = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    path: "/",
  });

  await User.findByIdAndUpdate(userId, { token });
  return token;
};
