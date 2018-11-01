import styles from "./requests-modal.scss";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "components/common/modal";
import RequestsForm from "./requests-form";
import { hide } from "store/project-requests/actions";

const modalContent = (
  <div className={styles.form}>
    <RequestsForm />
  </div>
);

const modalSuccessContent = (
  <div>Your request were received and will be reviewed shortly.</div>
);

const guestContent = (
  <div>
    <p>You need to login to be able to send your request.</p>
    <Link to="/login" className={`${styles.link} ${styles.login}`}>
      Log In
    </Link>
    <Link to="/signup" className={`${styles.link} ${styles.signup}`}>
      Sign Up
    </Link>
  </div>
);

const modalProps = {
  ariaLabel: "Request a new Project",
  triggerText: "Request a Project"
};

const propTypes = {};

const defaultProps = {};

@connect(
  (state, props) => ({
    requestSubmitted: state.projectRequests.get("requestSubmitted"),
    user: state.auth.get("user")
  }),
  dispatch => ({
    hideModalAction: () => dispatch(hide())
  })
)
export default class RequestsModal extends React.Component {
  render() {
    const {
      user,
      requestSubmitted,
      hideModalAction,
      ctaClassName
    } = this.props;
    return (
      <Modal
        {...modalProps}
        title={requestSubmitted ? "Thank You!" : "Request a Project"}
        onClose={hideModalAction}
        ctaClassName={ctaClassName}
      >
        {user
          ? requestSubmitted
            ? modalSuccessContent
            : modalContent
          : guestContent}
      </Modal>
    );
  }
}

RequestsModal.propTypes = propTypes;
RequestsModal.defaultProps = defaultProps;
