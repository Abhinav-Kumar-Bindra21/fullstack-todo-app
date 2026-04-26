import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 20,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    immutable: true,
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  token: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
