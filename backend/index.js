const express = require("express");
const { createTodo, updateTodo } = require("./zod"); // Assuming you have a zod schema for updating
const { todo } = require("./db");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(cors({}));

app.post("/todos", async (req, res) => {
  const createPayload = req.body;
  const parsedPayload = createTodo.safeParse(createPayload);
  if (!parsedPayload.success) {
    res.status(411).json({
      msg: "Wrong Inputs",
    });
    return;
  }
  await todo.create({
    title: createPayload.title,
    description: createPayload.description,
    completed: false,
  });

  res.json({
    msg: "Todo is created",
  });
});

app.get("/todos", async (req, res) => {
  const todos = await todo.find();

  res.json({
    todos,
  });
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


app.delete("todos/completed/:id",(req,res)=>{
  console.log("Delete method called")
})


app.listen(3000, () => {
  console.log("Server is started...");
});
