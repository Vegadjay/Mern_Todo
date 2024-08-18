import { useState, useEffect } from "react";
import axios from "axios";

function Todos({ count }) {
  const [todos, setTodos] = useState([]);
  const [visibleTodos, setVisibleTodos] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/todos")
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
    const updatedTodos = todos.map((todo) =>
      todo.title === title ? { ...todo, completed: !todo.completed } : todo
    );
    
    const todoToUpdate = updatedTodos.find((todo) => todo.title === title);

    setTodos(updatedTodos);

    axios
      .put(`http://localhost:3000/todos/${title}`, {
        completed: todoToUpdate.completed,
      })
      .then(() => {
        console.log("Todo updated successfully");
      })
      .catch(() => {
        setError("Failed to update todo");
        setTodos(todos); // Revert to the previous state on error
      });
  };

  const loadMoreTodos = () => {
    setVisibleTodos((prev) => prev + 10);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight) {
        loadMoreTodos();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) return <p className="text-center text-blue-600 font-semibold">Loading...</p>;
  if (error) return <p className="text-center text-red-600 font-semibold">{error}</p>;

  return (
    <div className="p-4 bg-gradient-to-b from-green-50 to-blue-50 w-[500px] rounded-lg shadow-xl max-h-screen overflow-y-auto space-y-4">
      {todos.slice(0, visibleTodos).map((todo) => (
        <div
          key={todo.title}
          className="p-4 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <h1 className="text-xl font-bold text-indigo-600">Title: {todo.title}</h1>
          <h2 className="text-lg text-gray-700">Description: {todo.description}</h2>
          <button
            onClick={() => handleClick(todo.title)}
            className={`mt-2 px-4 py-2 text-white font-semibold rounded-lg ${
              todo.completed
                ? "bg-green-500 cursor-default"
                : "bg-indigo-500 hover:bg-indigo-600 transition duration-300"
            }`}
            disabled={todo.completed}
          >
            {todo.completed ? "Completed" : "Mark as completed"}
          </button>
        </div>
      ))}
      {visibleTodos < todos.length && (
        <p className="text-center text-indigo-600 font-bold mt-4">Loading more...</p>
      )}
    </div>
  );
}

export default Todos;
