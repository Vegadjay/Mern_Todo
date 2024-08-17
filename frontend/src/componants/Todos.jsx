


import { useState, useEffect } from "react";
import axios from "axios";


function Todos({ count }) {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/todos").then((res) => {
      setTodos(res.data.todos);
    });
  }, [count]);

  const handleClick = (id) => {
    console.log(id);
  }


  return (
     <div>
      {todos.map((todo) => (
        <div key={todo.id}>
          <h1>Title: {todo.title}</h1>
          <h2>Description: {todo.description}</h2>
          <button onClick={() => handleClick(todo.id)}>Done</button>
        </div>
      ))}
    </div>
  );
}

export default Todos;
