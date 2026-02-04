import { useState } from "react";
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
  const [showDialog, setShowDialog] = useState(false);
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

  const toggleShowDialog = () => {
    setShowDialog(!showDialog);
    console.log("Alternar Modal");
  };

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
    toggleShowDialog;
  };
  return (
    <main>
      <Container>
        <Header>
          <Heading>
            <IconSchool /> Plano de estudos
          </Heading>
        </Header>

        <ChecklistsWrapper>
          <SubHeading>Para estudar</SubHeading>
          <ToDoList>
            {todos
              //Filtra todos os que não estão completed e retorna um array
              .filter((t) => !t.completed)
              //Percorre esse novo Array e exibe na tela dentro do componente ToDoItem
              .map(function (t) {
                return <ToDoItem key={t.id} item={t} />;
              })}
          </ToDoList>
          <SubHeading>Concluído</SubHeading>
          <ToDoList>
            {todos
              //Filtra todos os que estão completed e retorna um array
              .filter((t) => t.completed)
              //Percorre esse novo Array e exibe na tela dentro do componente ToDoItem
              .map(function (t) {
                return <ToDoItem key={t.id} item={t} />;
              })}
          </ToDoList>
          <Footer>
            <Dialog isOpen={showDialog} onClose={toggleShowDialog} className="dialog">
              <ToDoForm onSubmit={addToDo} />
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
