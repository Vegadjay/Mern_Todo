import { useState } from "react";
import "./App.css";
import CreateTodo from "./componants/CreateTodo";
import Todos from "./componants/Todos";

function App() {
  const [count, setCount] = useState(1);
  return (
    <div className="flex justify-center mt-14">
    <div className="container flex justify-center gap-20">
      <CreateTodo count={count} setCount={setCount} />
      <Todos count={count} setCount={setCount} />
    </div>
    </div>
  );
}

export default App;
