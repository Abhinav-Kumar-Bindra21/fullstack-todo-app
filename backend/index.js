import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import todoRouter from "../backend/routes/todosRouter.js";
import userRouter from "../backend/routes/userRouter.js";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
dotenv.config();

//middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    method: "GET,POST,PUT,DELETE",
    allowHeaders: ["Content-Type", "Authorization"],
  }),
);

// Connecting to mongodb
try {
  await mongoose.connect(process.env.CONNECTION_STRING);
  console.log("Connected to mongodb !!!");
} catch (error) {
  console.log(error);
}

//Making routes here

app.use("/todo", todoRouter);
app.use("/user", userRouter);

app.listen(process.env.PORT, () => {
  console.log("Server is Started Now !!!");
});
