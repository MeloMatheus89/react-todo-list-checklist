import "./form-item-add-mody.style.css";
import { Button } from "../Button";
import { TextInput } from "../TextInput";

export function ToDoForm({ onSubmit }) {
  return (
    <form className="form-item-add-modify" action={onSubmit}>
      <TextInput placeholder="Digite o item que deseja adicionar" required name="description" />
      <Button>Salvar item</Button>
    </form>
  );
}
