import { SubHeading } from "../SubHeading";
import { ToDoItem } from "../ToDoItem";
import { ToDoList } from "../ToDoList";

export function TodoGroup({ heading, items }) {
  return (
    <>
      <SubHeading>{heading}</SubHeading>
      <ToDoList>
        {items

          //Percorre esse novo Array e exibe na tela dentro do componente ToDoItem
          .map(function (t) {
            return <ToDoItem key={t.id} item={t} />;
          })}
      </ToDoList>
    </>
  );
}
