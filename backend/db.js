const mongoose = require("mongoose");
require("dotenv").config();
const mongoUrl = process.env.MONGODB_URL_STRING


mongoose.connect(mongoUrl);

const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
}, { timestamps: true });


const todo = mongoose.model("todos", todoSchema);
module.exports = {
  todo,
};
