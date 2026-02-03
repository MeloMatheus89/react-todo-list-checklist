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

## UseEffect para que serve?

Ele serve para lidar com efeitos colaterais dos componentes. Basicamente existem 3 formas de trabalhar com ele:

1. Ele sendo renderizado apenas uma vez.
   Neste formato ele lida com essas informações e depois some. Um bom exemplo seria uma dashboard que informa se o switch campus (por exemplo) está conectado. Ao abrir a dashboard, ele responde: "Online ou Offline". Mas ele faz isso buscando na API essa informação. Para isso usamos o array vazio na declaração dele.

```
  useEffect(() => {
    console.log("Sou executado apenas na montagem do componente! Tipo um componentDidMount.");
  }, []);
```

2. Ele executa uma função toda vez que o componente for chamado
   Neste formato o componente é renderizado e ele executa a função. Um bom exemplo é ele buscar uma API de uma válvula de pressão que precisa ser monitorada à todo o tempo. A sintaxe dele é usando o campo de `dependencias` vazio.

```
  import { useState, useEffect } from "react";

  export function PainelControle() {
  const [pressao, setPressao] = useState(0);
  const [temperatura, setTemperatura] = useState(0);

  // useEffect SEM ARRAY DE DEPENDÊNCIAS
  useEffect(() => {
    // Isso vai rodar se a pressão mudar...
    // ...se a temperatura mudar...
    // ...ou se qualquer outro estado/prop deste componente mudar.
    console.log("Auditoria: O painel da planta sofreu uma atualização de renderização.");

    // Exemplo: Sincronizar manualmente um plugin de gráfico que não é do React
    // pluginGrafico.sync();
  });

  return (
    <div className="painel">
      <h2>Status da Planta Química</h2>
      <p>Pressão: {pressao} atm</p>
      <button onClick={() => setPressao(pressao + 1)}>Aumentar Pressão</button>

      <p>Temperatura: {temperatura} °C</p>
      <button onClick={() => setTemperatura(temperatura + 5)}>Aumentar Temperatura</button>
    </div>
  );
}
```

Enquanto o componente estiver renderizado, ele irá atualizar o status da válvula fictícia de 1 em 1 segundo.

3. Com um array de dependências
   Agora sempre que alguma dependência for alterada, ele será executado. Para garantirmos um cenário mais crítico, imagine que ele será executado novamente sempre que o valor da mesma válvula de pressão alterar.

```
  // EFEITO A: Só busca o dado
  useEffect(() => {
  const id = setInterval(() => {
    setValorValvula(Math.random() * 20); // Simulando a API
    }, 3000);
  return () => clearInterval(id);
  }, []);

// EFEITO B: Só reage ao dado (Não causa loop porque não chama setValorValvula)
useEffect(() => {
  if (valorValvula > 15) {
     console.log("LOG: Pressão perigosa detectada no sistema!");
     // Aqui você poderia chamar uma API de log ou mudar um estado de "Alerta",
     // mas nunca o estado da própria válvula de novo.
  }
}, [valorValvula]);

```

Se quiséssemos explorar mais, podemos colocar a variável `{valorValvula}` para ser renderizada no componente buscando a informação da API e aí seria o mais próximo de tempo real.

Resumão:

`useEffect(fn, [valor]) `-> "Rode quando o valor mudar."

`useEffect(fn, []) `-> "Rode uma vez (no nascimento)."

`useEffect(fn) `-> "Rode sempre que o componente respirar."
