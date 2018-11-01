import styles from "./schedule-modal.scss";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "components/common/modal";
import ScheduleForm from "./schedule-form";
import { fetchProjects } from "store/auth/actions";
import { hide } from "store/schedule/actions";

const modalContent = (
  <div className={styles.form}>
    <ScheduleForm />
  </div>
);

const modalSuccessContent = <div>Your project were scheduled.</div>;

const guestContent = (
  <div>
    <p>You need to login to be able to schedule your project.</p>
    <Link to="/login" className={`${styles.link} ${styles.login}`}>
      Log In
    </Link>
    <Link to="/signup" className={`${styles.link} ${styles.signup}`}>
      Sign Up
    </Link>
  </div>
);

const noProjectsContent = (
  <div>
    <p>You do not have a project created, create one first.</p>
    <Link to="/projects/create" className={`${styles.link} ${styles.signup}`}>
      Create a project
    </Link>
  </div>
);

const modalProps = {
  ariaLabel: "Schedule a project",
  triggerText: "Schedule my project"
};

const propTypes = {};

const defaultProps = {};

@connect(
  (state, props) => ({
    scheduleSubmitted: state.schedule.get("scheduleSubmitted"),
    user: state.auth.get("user"),
    userProjects: state.auth.getIn(["userProjects", "items"]),
    userProjectsCount: state.auth.getIn(["userProjects", "count"])
  }),
  dispatch => ({
    fetchProjectsAction: user => dispatch(fetchProjects(user)),
    hideModalAction: () => dispatch(hide())
  })
)
export default class ScheduleModal extends React.Component {
  componentDidMount() {
    if (this.props.user && !this.props.userProjects) {
      this.props.fetchProjectsAction(this.props.user.slug);
    }
  }

  componentDidUpdate() {
    if (this.props.user && !this.props.userProjects) {
      this.props.fetchProjectsAction(this.props.user.slug);
    }
  }

  render() {
    const {
      user,
      userProjects,
      userProjectsCount,
      scheduleSubmitted,
      hideModalAction,
      ctaClassName
    } = this.props;
    const haveProjects = userProjects && userProjectsCount > 0;

    return (
      <Modal
        {...modalProps}
        title={scheduleSubmitted ? "Thank You!" : "Schedule a Project"}
        onClose={hideModalAction}
        ctaClassName={ctaClassName}
      >
        {user
          ? haveProjects
            ? scheduleSubmitted
              ? modalSuccessContent
              : modalContent
            : noProjectsContent
          : guestContent}
      </Modal>
    );
  }
}

ScheduleModal.propTypes = propTypes;
ScheduleModal.defaultProps = defaultProps;
