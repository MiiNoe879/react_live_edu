import styles from "./signup-role-form.scss";
import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signUpStepSetRole } from "store/auth/actions";
import { USER_ROLE_SUBSCRIBER, USER_ROLE_CREATOR } from "store/app/constants";
import IconSubscriber from "../../../../assets/img/icons/signup-subscriber.svg";
import IconCreator from "../../../../assets/img/icons/signup-creator.svg";

const propTypes = {};

const defaultProps = {};

@connect(
  (state, props) => ({
    role: state.auth.getIn(["steps", "user_role"])
  }),
  dispatch => ({
    setRoleAction: role => dispatch(signUpStepSetRole(role))
  })
)
export default class SignupRoleForm extends React.Component {
  render() {
    const { setRoleAction } = this.props;

    return (
      <div className={styles.form}>
        <button
          className={styles.formLeft}
          onClick={() => setRoleAction(USER_ROLE_SUBSCRIBER)}
        >
          <img src={IconSubscriber} className={styles.formIcon} />
          <p className={styles.formTitle}>I want to Study</p>
          <p className={styles.formText}>
            Learn any technology faster by completing real live projects. In
            future, you also can create your own projects.
          </p>
        </button>

        <div className={styles.formDivider}>or</div>

        <button
          className={styles.formRight}
          onClick={() => setRoleAction(USER_ROLE_CREATOR)}
        >
          <img src={IconCreator} className={styles.formIcon} />
          <p className={styles.formTitle}>I want to Create Projects</p>
          <p className={styles.formText}>
            Become a project creator, share your experience, earn money and
            engage your audience.
          </p>
        </button>
      </div>
    );
  }
}

SignupRoleForm.propTypes = propTypes;
SignupRoleForm.defaultProps = defaultProps;
