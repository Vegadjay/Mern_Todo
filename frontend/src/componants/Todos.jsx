function Todos({ todos }) {
  function checkCompleted(id) {
    
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
