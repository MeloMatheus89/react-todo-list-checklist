import "./empty-state.style.css";

export function EmptyState() {
  return (
    <section className="empty-state">
      <p>Ainda não tem tarefas cadastradas. Adicione para começar!</p>
      <img src="/empty.png" alt="Não há nada a ser exibido" />
    </section>
  );
}
