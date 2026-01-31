import { useEffect, useRef } from "react";
import "./dialog.style.css";

export function Dialog({ isOpen, onClose }) {
  //Não devemos fazer esse tipo de buscas no DOM desse jeito
  //const dialog = document.querySelector("dialog");

  const dialogRef = useRef(null);

  useEffect(() => {
    console.log(`Deveríamos mostrar a modal? ${isOpen}`);
    if (isOpen) {
      openDialog();
    } else {
      closeDialog();
    }
  }, [isOpen]);

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
        <button autoFocus onClick={onClose}>
          Close
        </button>
        <p>This modal dialog has a groovy backdrop!</p>
      </dialog>
    </>
  );
}
