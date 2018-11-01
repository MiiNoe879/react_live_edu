import styles from "./modal-content.scss";
import React from "react";
import ReactDOM from "react-dom";
import ReactFocusTrap from "focus-trap-react";

const ModalContent = ({
  ariaLabel,
  buttonRef,
  content,
  modalRef,
  onClickAway,
  onClose,
  title,
  role = "dialog"
}) => {
  return ReactDOM.createPortal(
    <ReactFocusTrap
      tag="aside"
      focusTrapOptions={{ onDeactivate: onClose }}
      className={styles.modalCover}
      role={role}
      aria-label={ariaLabel}
      aria-modal="true"
      onClick={onClickAway}
    >
      <div className={styles.modal} ref={modalRef}>
        <div className={styles.modalHeader}>
        <h4 className={styles.modalTitle}>{title}</h4>
        <button
          className={styles.modalClose}
          aria-labelledby="close-modal"
          onClick={onClose}
          ref={buttonRef}
        >
          <span id="close-modal" className={styles.utilityModalHideVisually}>
            Close Modal
          </span>
          <svg viewBox="0 0 40 40" className={styles.modalCloseIcon}>
            <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
          </svg>
        </button>
        </div>
        <div className={styles.modalBody}>{content}</div>
      </div>
    </ReactFocusTrap>,
    document.body
  );
};

export default ModalContent;
