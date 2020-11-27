import { useState } from "react";
import "./App.scss";
import Hero from "./components/Hero";

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("Nguyen Nhat Thien");
  return (
    <div className="app">
      <h1>React Hook - Post List</h1>
      <h3>{count}</h3>
      <button onClick={() => setCount(count + 1)}>Count++</button>
      <Hero name={name} />
    </div>
  );
}

export default App;
