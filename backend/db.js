const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://Todo:JayVegad555@cluster0.nbhadhq.mongodb.net/"
);

const todoSchema = mongoose.Schema({
  id:Number,
  title: String,
  description: String,
  completed: Boolean,
});

const todo = mongoose.model("todos", todoSchema);
module.exports = {
  todo,
};
