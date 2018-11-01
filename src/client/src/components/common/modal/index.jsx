import styles from "./index.scss";
import React, { Component, Fragment } from "react";
import ModalTrigger from "./modal-triger";
import ModalContent from "./modal-content";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

  componentDidMount() {
    if (this.props.forceShow) {
      this.onOpen();
    }
  }

  componentWillUnmount() {
    this.removeScrollLock();
  }

  onOpen = () => {
    this.setState({ isOpen: true }, () => {
      this.closeButtonNode.focus();
    });
    this.addScrollLock();
  };

  onClose = () => {
    this.setState({ isOpen: false });
    if (this.openButtonNode) {
      this.openButtonNode.focus();
    }
    this.removeScrollLock();
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  onClickAway = e => {
    if (this.modalNode && this.modalNode.contains(e.target)) return;
    this.onClose();
  };

  addScrollLock = () =>
    document.querySelector("html").classList.add(styles.utilityModalLockScroll);

  removeScrollLock = () =>
    document
      .querySelector("html")
      .classList.remove(styles.utilityModalLockScroll);

  render() {
    const { isOpen } = this.state;
    const {
      ariaLabel,
      children,
      title,
      triggerText,
      role,
      ctaClassName
    } = this.props;
    return (
      <Fragment>
        <ModalTrigger
          onOpen={this.onOpen}
          buttonRef={n => (this.openButtonNode = n)}
          text={triggerText}
          ctaClassName={ctaClassName}
        />
        {isOpen && (
          <ModalContent
            ariaLabel={ariaLabel}
            buttonRef={n => (this.closeButtonNode = n)}
            modalRef={n => (this.modalNode = n)}
            content={children}
            title={title}
            onClickAway={this.onClickAway}
            onClose={this.onClose}
            role={role}
          />
        )}
      </Fragment>
    );
  }
}

export default Modal;
