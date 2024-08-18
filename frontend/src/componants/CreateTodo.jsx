import { useState } from "react";

function CreateTodo({ setCount }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const changeTitle = (event) => {
    setTitle(event.target.value);
  };

  const changeDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) {
      setError("Title and description cannot be empty.");
      return;
    }

    setLoading(true);
    fetch("http://localhost:3000/todos", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        description: description,
        completed: false,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to create todo");
        const json = await res.json();
        console.log(json);
        setCount((count) => count + 1);
        setTitle("");
        setDescription("");
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] min-w-[300px] sm:min-w-[400px] md:h-[500px] md:w-[400px] border border-gray-300 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-4 md:p-6 space-y-4">
      <header className="text-2xl md:text-3xl font-extrabold text-indigo-600 text-center">Write Todo Here</header>
      <input
        type="text"
        id="title"
        placeholder="Title"
        value={title}
        onChange={changeTitle}
        className="w-full px-3 py-2 md:px-4 md:py-2 text-gray-700 bg-white border border-indigo-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
      />
      <input
        type="text"
        placeholder="Description"
        id="description"
        value={description}
        onChange={changeDescription}
        className="w-full px-3 py-2 md:px-4 md:py-2 text-gray-700 bg-white border border-indigo-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full py-2 text-white font-bold bg-indigo-500 rounded-lg hover:bg-indigo-600 transition duration-300 ease-in-out transform hover:scale-105 active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {loading ? "Adding..." : "Add Todo"}
      </button>
      {error && (
        <p className="mt-4 text-red-600 text-center font-semibold animate-pulse">
          {error}
        </p>
      )}
    </div>
  );
}

export default CreateTodo;
