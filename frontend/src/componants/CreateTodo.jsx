import { useState } from "react";

function CreateTodo({setCount}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const changeTitle = (event) => {
    setTitle(event.target.value);
  };

  const changeDiscription = (event) => {
    setDescription(event.target.value);
  };
  return (
    <div>
      <input
        type="text"
        id="title"
        placeholder="Title"
        onChange={changeTitle}
      />
      <br />
      <input
        type="text"
        placeholder="Description"
        id="dis"
        onChange={changeDiscription}
      />
      <br />
      <button
        onClick={() => {
          fetch("http://localhost:3000/todos", {
            method: "POST",
            body: JSON.stringify({
              title: title,
              description: description,
              completed:false
            }),
            headers: {
              "Content-type": "application/json",
            },
          }).then(async (res) => {
            const json = await res.json();
          });
          setCount((count) => count + 1);
        }} 
      >
        Add todo
      </button>
    </div>
  );
}

export default CreateTodo;
