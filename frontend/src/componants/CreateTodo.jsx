import { useState } from "react";

function CreateTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todoId, settodoId] = useState(0);
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
          fetch("http://localhost:3000/todo", {
            method: "POST",
            body: JSON.stringify({
              id:todoId,
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
          settodoId(todoId+1);
        }}
        
      >
        Add todo
      </button>
    </div>
  );
}

export default CreateTodo;
