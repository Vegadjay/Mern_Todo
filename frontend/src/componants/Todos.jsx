function Todos({ todos }) {
  function checkCompleted(id) {
    
    fetch("http://localhost:3000/completed").then((res)=>{
      console.log("Todo completed")
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
