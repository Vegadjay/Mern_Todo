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
    <div>
      <input
        type="text"
        id="title"
        placeholder="Title"
        value={title}
        onChange={changeTitle}
      />
      <br />
      <input
        type="text"
        placeholder="Description"
        id="description"
        value={description}
        onChange={changeDescription}
      />
      <br />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Adding..." : "Add todo"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default CreateTodo;
