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


app.put("/todos/:title", async (req, res) => {
    const findTodo = await todo.find(title,()=>{
      console.log("Title Finded from the backend");
    })
    console.log(findTodo);
});


app.delete("todos/completed/:id",(req,res)=>{
  console.log("Delete method called")
})


app.listen(3000, () => {
  console.log("Server is started...");
});
