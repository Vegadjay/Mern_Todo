import { useState } from "react";
import "./App.css";
import CreateTodo from "./componants/CreateTodo";
import Todos from "./componants/Todos";
import { useEffect } from "react";
function App() {
  const [todos, setTodos] = useState([]);
  // useEffect(() => {
  //   fetch("http://localhost:3000/todos").then(async (res) => {
  //     const data = await res.json();
  //     setTodos(data.todos);
  //   });
  // }, []);
  useEffect(() => {
    fetch("http://localhost:3000/todos").then(async (res) => {
      const data = await res.json();
      setTodos(data.todos);
    });
  }, [todos]);
  return (
    <>
      <CreateTodo />
      <Todos todos={todos} />
    </>
  );
}

export default App;
