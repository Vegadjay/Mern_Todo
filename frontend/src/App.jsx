import { useState } from "react";
import "./App.css";
import CreateTodo from "./componants/CreateTodo";
import Todos from "./componants/Todos";

function App() {
  const [count, setCount] = useState(1);

  return (
    <div
      className="bg-slate-700 flex justify-center min-h-screen">
      <div className="container flex flex-col md:flex-row justify-center gap-10 md:gap-20 px-4 py-8 rounded-lg">
        <CreateTodo count={count} setCount={setCount} />
        <Todos count={count} setCount={setCount} />
      </div>
    </div>
  );
}

export default App;
