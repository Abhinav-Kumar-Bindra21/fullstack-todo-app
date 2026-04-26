import Todo from "../models/todos.js";

export const createTodo = async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
    completed: req.body.completed,
    user: req.user._id,
  });

  try {
    const todos = await todo.save();
    res.status(201).json({ Message: "Todo Created successfully !!!", todos });
  } catch (error) {
    res.status(400).send("Error is" + error);
  }
};

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id }); // fetch todos for only user

    if (!todos) {
      req.status(400).send("Failed to fetch Todo from Database");
    }
    res.status(201).json({ Message: "todos fetched successfully", todos: todos });
  } catch (error) {
    res.status(400).send("Error is" + error);
  }
};

export const updateTodo = async (req, res) => {
  const id = req.params.id;
  try {
    const todo = await Todo.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
    });
    res.status(200).json({
      message: "Todo updated successfully",
      todo: todo,
    });
  } catch (error) {
    res.status(400).send("Error is" + error);
  }
};

export const deleteTodo = async (req, res) => {
  const id = req.params.id;
  try {
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
      res.status(400).send("Todo is not present ");
    }

    res.status(201).send("Todo deleted successfully !!!");
  } catch (error) {
    res.status(400).send("Error is :-" + error);
  }
};
