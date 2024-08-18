const express = require("express");
const { createTodo, updateTodo } = require("./zod");
const { todo } = require("./db");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(cors({}));

app.post("/todos", async (req, res) => {
  const { title, description, completed } = req.body;
  try {
    const newTodo = new todo({
      title,
      description,
      completed,
    });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});


app.get("/todos", async (req, res) => {
  try {
    const todos = await todo.find();
    res.json({ todos });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});


const updateData = {
  completed:true
}


app.put("/todos/:title", async (req, res) => {
  const title = req.params.title;
    try { 
      const updatedData1 = await todo.findOneAndUpdate({title:title},updateData,{new:true})
      if(updatedData1) {
        res.json(updatedData1)
      }
      else {
        res.status(404).send("Todo not found")
      }
    } catch(e) {
      console.error(e);
    }
});



app.put("/todos/update/:title", async (req, res) => {
  const title = req.params.title;
  const updateData = {
    title: req.body.title,
    description: req.body.description,

    ...(req.body.completed !== undefined && { completed: req.body.completed }),
  };

  try {
    const updatedTodoData = await todo.findOneAndUpdate(
      { title: title },
      updateData,
      { new: true }
    );

    if (updatedTodoData) {
      res.json(updatedTodoData);
    } else {
      res.status(404).send("Todo not found");
    }
  } catch (e) {
    console.log(e);
    res.status(500).send("An error occurred while updating the todo");
  }
});

app.delete('/todos/delete/:title', async (req, res) => {
  try {
    const { title } = req.params;
    const deletedTodo = await todo.findOneAndDelete({ title });

    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(3000, () => {
  console.log("Server is started...");
});
