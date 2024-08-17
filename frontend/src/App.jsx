import { useState } from "react";
import "./App.css";
import CreateTodo from "./componants/CreateTodo";
import Todos from "./componants/Todos";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <CreateTodo setCount={setCount} />
      <Todos count={count} />
    </>
  );
}

export default App;
