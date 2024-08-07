const express = require("express");
const { createTodo, updateTodo } = require("./zod");
const { todo } = require("./db");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

app.post("/todo", async (req, res) => {
  const createPayload = req.body;
  const parsedPayload = createTodo.safeParse(createPayload);
  if (!parsedPayload.success) {
    res.status(411).json({
      msg: "Wrong Inputs",
    });
    return;
  } // put the todo in mongo db
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

app.put("/compeleted", async (req, res) => {
  const updatePayload = req.body;
  const parseupdatePayload = updatePayload.safeParse(updatePayload);
  if (!parseupdatePayload.success) {
    res.status(404).json({
      msg: "Input is not valid so todo is not updated",
    });
    return;
  }
  await todo.update(
    {
      _id: req.body.id,
    },
    {
      completed: true,
    }
  );
  res.json({
    msg: "Todo marked as completed",
  });
});

app.listen(3000, () => {
  console.log("Server is started...");
});
