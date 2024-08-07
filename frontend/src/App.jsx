import { useState } from "react";
import "./App.css";
import CreateTodo from "./componants/CreateTodo";
import Todos from "./componants/Todos";
function App() {
  const [todos, setTodos] = useState([]);
  fetch("http://localhost:3000/todos").then(async (res) => {
    const data = await res.json();
    setTodos(data.todos);
  });
  return (
    <>
      <CreateTodo />
      <Todos todos={todos} />
    </>
  );
}

export default App;
