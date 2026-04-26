import express from "express";
import { login, logout, register } from "../controllers/user.js";

const Router = express.Router();

Router.post("/signup", register);
Router.post("/login", login);
Router.get("/logout", logout);

export default Router;
