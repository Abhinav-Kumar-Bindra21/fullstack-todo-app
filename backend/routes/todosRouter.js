import express from "express";
import { createTodo, getTodos, deleteTodo, updateTodo } from "../controllers/todo.js";
import { authenticate } from "../middleware/authorized.js";

const Router = express.Router();

Router.post("/create", authenticate, createTodo);
Router.get("/fetch", authenticate, getTodos);
Router.put("/update/:id", authenticate, updateTodo);
Router.delete("/delete/:id", authenticate, deleteTodo);

export default Router;
