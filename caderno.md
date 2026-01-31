# "Limitações" do React JS (Aspas colossais)

Observe o código abaixo do componente JSX chamado Dialog. O que ele tem de errado?

```
import "./dialog.style.css";

export function Dialog() {
  const dialog = document.querySelector("dialog");
  const showButton = document.querySelector("dialog + button");
  const closeButton = document.querySelector("dialog button");

  // "Show the dialog" button opens the dialog modally
  showButton.addEventListener("click", () => {
    dialog.showModal();
  });

  // "Close" button closes the dialog
  closeButton.addEventListener("click", () => {
    dialog.close();
  });
  return (
    <>
      <dialog>
        <button autofocus>Close</button>
        <p>This modal dialog has a groovy backdrop!</p>
      </dialog>
      <button>Show the dialog</button>
    </>
  );
}

```

Nada, né!? **Aí que você se engana!**

Esse código vai quebra porque ele tenta buscar elementos que **ainda não existem.** No React, o corpo da função é executado para preparar o que será mostrado; o HTML só nasce de fato no navegador **depois** que a função termina o seu `return`

Isso acontece porque o React é **declarativo**. No modelo **imperativo** (JavaScript tradicional), você usa o documento `document.querySelector`para dar uma ordem direta: "Vá ao navegador, procure o elemento X e guarde-o". No react, nós não caçamos elementos manualmente.

No React o comportamento é mais de "avisar" que alguma coisa precisa ser renderizada na tela após alguma mudança de estado.

## Como resolver essa situação? useRef

O que faz o useRef? Ele pega um objeto que não será referenciado durante a renderização do DOM. Usamos ele de forma declarativa para que ele consiga receber o evento (click, no caso) e mostre o elemento HTML `<dialog>`.

No exemplo abaixo ele recebe a referência do elemento dialog. Observe:

```
export function Dialog() {

  const dialogRef = useRef(null);

  // "Show the dialog" button opens the dialog modally
  const openDialog = () => {
    dialogRef.current.showModal();
  };

  // "Close" button closes the dialog
  const closeDialog = () => {
    dialogRef.current.close();
  };
  return (
    <>
      <dialog ref={dialogRef}>
        <button autoFocus onClick={closeDialog}>
          Close
        </button>
        <p>This modal dialog has a groovy backdrop!</p>
      </dialog>
      <button onClick={openDialog}>Show the dialog</button>
    </>
  );
}
```

Perceba que a abertura da tag recebe a referência para iniciar o uso do useRef para que então consiga ter as interações dos botões de abrir e fechar.
