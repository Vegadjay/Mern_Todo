import { useState, useEffect } from "react";
import "./App.css";
import CreateTodo from "./componants/CreateTodo";
import Todos from "./componants/Todos";
import axios from 'axios'

function useTodos () {
    const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/todos").then(async (res) => {
      setTodos(res.data.todos);
    });
  }, []);
  return todos;
}

function App() {
  const todos = useTodos();

  return (
    <>
      <CreateTodo todos={todos} />
      <Todos todos={todos} />
    </>
  );
}

export default App;
