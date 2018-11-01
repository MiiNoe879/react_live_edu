import styles from "./modal-triger.scss";
import React from "react";

const ModalTrigger = ({ buttonRef, onOpen, text, ctaClassName }) => (
  <button
    className={ctaClassName ? ctaClassName : styles.modalButton}
    onClick={onOpen}
    ref={buttonRef}
  >
    {text}
  </button>
);

export default ModalTrigger;
