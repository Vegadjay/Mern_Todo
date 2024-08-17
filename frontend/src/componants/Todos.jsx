// In this code all id true false done and now do any other things

import { useState, useEffect } from "react";
import axios from "axios";

function Todos({ count }) {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/todos").then((res) => {
      setTodos(res.data.todos);
    });
  }, [count]);

  const handleClick = (title) => {
    axios.put(`http://localhost:3000/todos/${title}`).then((res)=>{
      console.log("Completed")
    })
  }

  return (
     <div>
      {todos.map((todo) => (
        <div key={todo.title}>
          <h1>Title: {todo.title}</h1>
          <h2>Description: {todo.description}</h2>
          <button onClick={() => {handleClick(todo.title)}}>
            Done
          </button>
        </div>
      ))}
    </div>
  );
}

export default Todos;
