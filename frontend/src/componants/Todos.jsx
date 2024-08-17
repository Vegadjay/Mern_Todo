import { useState, useEffect } from "react";
import axios from "axios";

function Todos({ count }) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:3000/todos")
      .then((res) => {
        setTodos(res.data.todos);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load todos");
        setLoading(false);
      });
  }, [count]);

  const handleClick = (title) => {
    const updatedTodos = todos.map(todo =>
      todo.title === title ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);

    axios.put(`http://localhost:3000/todos/${title}`, { completed: !todos.find(todo => todo.title === title).completed })
      .then(() => {
        console.log("Todo updated successfully");
      })
      .catch(() => {
        setError("Failed to update todo");
        setTodos(todos); // Revert to the previous state on error
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.title}>
          <h1>Title: {todo.title}</h1>
          <h2>Description: {todo.description}</h2>
          <button onClick={() => handleClick(todo.title)}>
            {todo.completed ? "Completed" : "Mark as completed"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Todos;
