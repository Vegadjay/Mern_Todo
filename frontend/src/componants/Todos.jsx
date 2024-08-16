function Todos({ todos }) {
  function checkCompleted() {
    fetch("http://localhost:3000/compeleted").then((res)=>{
      console.log("Todo Completed")
      console.log(res)
    })
  }
  return (
    <div>
      {todos.map((todo)=> {
        return (
          <div>
            <h1>{todo.title}</h1>
            <h2>{todo.description}</h2>
            <button onClick={checkCompleted}>
              {/* {todo.completed == true ? "Completed" : "Mark as completed "} */}
              Done
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Todos;
