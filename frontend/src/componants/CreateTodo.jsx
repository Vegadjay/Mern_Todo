function CreateTodo() {
  return (
    <div>
      <input type="text" placeholder="Title" />
      <br />
      <input type="text" placeholder="Description" />
      <br />
      <button
        onClick={() => {
          fetch("http://localhost:3000/todo",{
            method:"POST",
            body: {
              title:"Doing Home work",
              description:"Home work"
            }
          }).then(async (res) => {
          });
        }}
      >
        Add todo
      </button>
    </div>
  );
}

export default CreateTodo;
