import mongoose from "mongoose";
const { Schema } = mongoose;
const todosSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  completed: {
    type: Boolean,
    required: true,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Todo = mongoose.model("Todo", todosSchema);

export default Todo;
