import { useEffect, useState } from "react";
import TodoContext from "./TodoContext";

const TODOS = "todos";

export function TodoProvider({ children }) {
  const savedTodos = localStorage.getItem(TODOS);
  const [todos, setTodos] = useState(savedTodos ? JSON.parse(savedTodos) : []);
  const [selectedTodo, setSelectedTodo] = useState();

  const [showDialog, setShowDialog] = useState(false);
  const openFormTodoDialog = (todo) => {
    if (todo) {
      setSelectedTodo(todo);
    }
    setShowDialog(true);
  };

  const closeFormTodoDialog = () => {
    setShowDialog(false);
    setSelectedTodo(null);
  };

  useEffect(() => {
    localStorage.setItem(TODOS, JSON.stringify(todos));
  }, [todos]);

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
  return (
    <TodoContext
      value={{
        todos,
        addToDo,
        toggleTodoCompleted,
        deleteTodo,
        showDialog,
        openFormTodoDialog,
        closeFormTodoDialog,
        selectedTodo,
      }}
    >
      {children}
    </TodoContext>
  );
}
