import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { TodoProvider } from "./components/TodoProvider/index.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Dessa forma todo mundo dentro de TodoProvider vai ter acesso à tudo que estiver no value*/}
    <TodoProvider>
      <App />
    </TodoProvider>
  </StrictMode>,
);
