import { useState } from "react";
import "./App.css";
import CreateTodo from "./componants/CreateTodo";
import Todos from "./componants/Todos";

function App() {
  const [count, setCount] = useState(1);

  return (
    <>
      <CreateTodo count={count} setCount={setCount} />
      <Todos count={count} setCount={setCount} />
    </>
  );
}

export default App;
