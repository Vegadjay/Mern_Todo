function Todos({ todos }) {
  function checkCompleted() {
    console.log(`button value is true`)
    return true;
  }
  return (
    <div>
      {todos.map(function (todo) {
        return (
          <div>
            <h1>{todo.title}</h1>
            <h2>{todo.description}</h2>
            <button onClick={checkCompleted}>
              {todo.completed == true ? "Completed" : "Mark as completed "}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Todos;
