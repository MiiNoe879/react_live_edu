import styles from "./step-2.scss";
import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { SIGNUP_STEP_ERROR_URL } from "store/auth/constants";
import LoginSingupHeader from "components/presentational/auth-flow/login-signup-header";
import SignupRoleForm from "components/presentational/auth-flow/signup-role-form";

const propTypes = {};

const defaultProps = {};

@connect((state, props) => ({
  role: state.auth.getIn(["signupStep2", "role"]),
  username: state.auth.getIn(["signupStep1", "username"])
}))
export default class SignupStep2 extends React.Component {
  render() {
    const { role, username } = this.props;

    if (role) {
      return <Redirect to="/signup/step-3" />;
    }

    if (!username) {
      return <Redirect to={SIGNUP_STEP_ERROR_URL} />;
    }

    return (
      <React.Fragment>
        <LoginSingupHeader
          title="Now choose your role"
          text="Congratulations! You have become a part of LiveEdu community, choose an activity you want to perform on site."
        />

        <SignupRoleForm />
      </React.Fragment>
    );
  }
}

SignupStep2.propTypes = propTypes;
SignupStep2.defaultProps = defaultProps;
