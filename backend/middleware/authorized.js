import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const authenticate = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(400).json({ message: "unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const authUser = await User.findById(decoded.userId);
    //
    if (!authUser) {
      return res.status(400).json({ errors: "Unauthorized User" });
    }

    req.user = authUser;

    next();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
