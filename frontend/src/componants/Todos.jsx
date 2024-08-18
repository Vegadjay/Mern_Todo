import { useState, useEffect } from "react";
import axios from "axios";
import { PencilIcon, PencilAltIcon } from "@heroicons/react/solid";

function Todos({ count }) {
  const [todos, setTodos] = useState([]);
  const [visibleTodos, setVisibleTodos] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editTodo, setEditTodo] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

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
        setTodos(todos);
      });
  };

  const handleEdit = (todo) => {
    setEditTodo(todo.title);
    setNewTitle(todo.title);
    setNewDescription(todo.description);
  };

  const handleSave = () => {
    axios
      .put(`http://localhost:3000/todos/update/${editTodo}`, {
        title: newTitle,
        description: newDescription,
      })
      .then((res) => {
        const updatedTodos = todos.map((todo) =>
          todo.title === editTodo
            ? { ...todo, title: res.data.title, description: res.data.description }
            : todo
        );
        setTodos(updatedTodos);
        setEditTodo(null);
      })
      .catch(() => {
        setError("Failed to save changes");
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
    <div className="p-4 bg-gradient-to-b from-green-50 to-blue-50 w-full md:w-[500px] max-w-[90%] rounded-lg shadow-xl max-h-screen overflow-y-auto space-y-4">
      <h1 className="text-center text-2xl font-extrabold text-indigo-600 mb-4">TODOS</h1>
      {todos.slice(0, visibleTodos).map((todo) => (
        <div
          key={todo.title}
          className="p-4 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          {editTodo === todo.title ? (
            <div>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full mb-2 p-2 border border-gray-300 rounded-lg"
              />
              <textarea
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="w-full mb-2 p-2 border border-gray-300 rounded-lg"
              />
              <button
                onClick={handleSave}
                className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition duration-300"
              >
                Save
              </button>
            </div>
          ) : (
            <div>
              <h1 className="text-lg md:text-xl font-bold text-indigo-600">Title: {todo.title}</h1>
              <h2 className="text-sm md:text-lg text-gray-700">Description: {todo.description}</h2>
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => handleClick(todo.title)}
                  className={`flex items-center px-3 py-2 md:px-4 md:py-2 text-white font-semibold rounded-lg ${
                    todo.completed
                      ? "bg-green-500 cursor-default"
                      : "bg-indigo-500 hover:bg-indigo-600 transition duration-300"
                  }`}
                  disabled={todo.completed}
                >
                  <PencilIcon className="h-5 w-5 mr-2" />
                  {todo.completed ? "Completed" : "Mark as completed"}
                </button>
                <button
                  onClick={() => handleEdit(todo)}
                  className="flex items-center px-3 py-2 md:px-4 md:py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition duration-300"
                >
                  <PencilAltIcon className="h-5 w-5 mr-2" />
                  Edit
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
      {visibleTodos < todos.length && (
        <p className="text-center text-indigo-600 font-bold mt-4">Loading more...</p>
      )}
    </div>
  );
}

export default Todos;
