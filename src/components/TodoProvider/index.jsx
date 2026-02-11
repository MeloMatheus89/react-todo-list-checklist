import { useState } from "react";
import TodoContext from "./TodoContext";

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([
    {
      id: 1,
      description: "JSX e componentes",
      completed: false,
      createdAt: "2022-10-31",
    },
    {
      id: 2,
      description: "Controle de inputs e formulários controlados",
      completed: true,
      createdAt: "2022-10-31",
    },
  ]);

  const addToDo = (formdata) => {
    const description = formdata.get("description");
    setTodos((prevState) => {
      const todo = {
        id: prevState.length + 1,
        //forma alternativa: `description,`, o próprio javaScript
        // entende que quando tem uma propriedade chamada description
        // com o mesmo nome do campo de input, ele já busca ela ali.
        // Facilita a vida, mas é melhor evitar para não dar problema.
        description: description,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      return [...prevState, todo];
    });
  };
  const toggleTodoCompleted = (todo) => {
    setTodos((prevState) => {
      return prevState.map((t) => {
        if (t.id === todo.id) {
          return {
            ...t,
            completed: !t.completed,
          };
        }
        return t;
      });
    });
    console.table(todos);
  };
  const deleteTodo = (todo) => {
    setTodos((prevState) => {
      return prevState.filter((t) => t.id != todo.id);
    });
  };
  return <TodoContext value={{ todos, addToDo, toggleTodoCompleted, deleteTodo }}>{children}</TodoContext>;
}
