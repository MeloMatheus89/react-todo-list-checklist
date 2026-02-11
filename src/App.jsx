import { use, useState } from "react";
import { ChecklistsWrapper } from "./components/ChecklistsWrapper";
import { Container } from "./components/Container";
import { Dialog } from "./components/Dialog";
import { FabButton } from "./components/FabButton";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Heading } from "./components/Heading";
import { IconPlus, IconSchool } from "./components/icons";
import { SubHeading } from "./components/SubHeading";
import { ToDoItem } from "./components/ToDoItem";
import { ToDoList } from "./components/ToDoList";
import { ToDoForm } from "./components/ToDoForm";
import TodoContext from "./components/TodoProvider/TodoContext";
import { TodoGroup } from "./components/TodoGroup";

// const todos = [
//   {
//     id: 1,
//     description: "JSX e componentes",
//     completed: false,
//     createdAt: "2022-10-31",
//   },
//   {
//     id: 2,
//     description: "Props, state e hooks",
//     completed: false,
//     createdAt: "2022-10-31",
//   },
//   {
//     id: 3,
//     description: "Ciclo de vida dos componentes",
//     completed: false,
//     createdAt: "2022-10-31",
//   },
//   {
//     id: 4,
//     description: "Testes unitários com Jest",
//     completed: false,
//     createdAt: "2022-10-31",
//   },
// ];
// const completed = [
//   {
//     id: 5,
//     description: "Controle de inputs e formulários controlados",
//     completed: true,
//     createdAt: "2022-10-31",
//   },
//   {
//     id: 6,
//     description: "Rotas dinâmicas",
//     completed: true,
//     createdAt: "2022-10-31",
//   },
// ];

function App() {
  const toggleShowDialog = () => {
    setShowDialog(!showDialog);
  };
  const [showDialog, setShowDialog] = useState(false);
  const { todos, addToDo } = use(TodoContext);
  function handleFormSubmit(formData) {
    addToDo(formData);
    toggleShowDialog();
  }

  // Renderização
  return (
    <main>
      <Container>
        <Header>
          <Heading>
            <IconSchool /> Plano de estudos
          </Heading>
        </Header>

        <ChecklistsWrapper>
          <TodoGroup
            heading="Para estudar"
            items={todos
              //Filtra todos os que não estão completed e retorna um array
              .filter((t) => !t.completed)}
          />
          <TodoGroup
            heading="Concluido"
            items={todos
              //Filtra todos os que não estão completed e retorna um array
              .filter((t) => t.completed)}
          />

          <Footer>
            <Dialog isOpen={showDialog} onClose={toggleShowDialog} className="dialog">
              <ToDoForm onSubmit={handleFormSubmit} />
            </Dialog>
            <FabButton onClick={toggleShowDialog}>
              <IconPlus />
            </FabButton>
          </Footer>
        </ChecklistsWrapper>
      </Container>
    </main>
  );
}

export default App;
