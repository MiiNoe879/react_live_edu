import styles from "./step-1.scss";
import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  SIGNUP_STEP_ERROR_URL,
  SIGNUP_SOCIAL_ERRORS
} from "store/auth/constants";
import { clearSignupSocialError } from "store/auth/actions";
import LoginSingupHeader from "components/presentational/auth-flow/login-signup-header";
import SignupUsernameForm from "components/presentational/auth-flow/signup-username-form";

const propTypes = {};

const defaultProps = {};

@connect(
  (state, props) => ({
    username: state.auth.getIn(["signupStep1", "username"]),
    email: state.auth.getIn(["signupStep0", "email"]),
    password: state.auth.getIn(["signupStep0", "password"]),
    passwordConfirm: state.auth.getIn(["signupStep0", "passwordConfirm"]),
    socialSignupToken: state.auth.getIn(["signupSocial", "access_token"]),
    signupSocialError: state.auth.getIn(["signupSocial", "error"])
  }),
  dispatch => ({
    clearSignupSocialErrorAction: () => dispatch(clearSignupSocialError())
  })
)
export default class SignupStep1 extends React.Component {
  componentDidMount() {
    if (
      this.props.signupSocialError ===
      SIGNUP_SOCIAL_ERRORS.SOCIAL_ACCOUNT_IS_NOT_CONNECTED.type
    ) {
      this.props.clearSignupSocialErrorAction();
    }
  }

  render() {
    const {
      username,
      email,
      password,
      passwordConfirm,
      socialSignupToken
    } = this.props;

    if (username) {
      return <Redirect to="/signup/step-2" />;
    }

    if (!socialSignupToken && (!email || !password || !passwordConfirm)) {
      return <Redirect to={SIGNUP_STEP_ERROR_URL} />;
    }

    return (
      <React.Fragment>
        <LoginSingupHeader
          title="Write your username"
          text="It will be your profile name that will appear next to your avatar"
        />

        <div className={styles.form}>
          <SignupUsernameForm />
        </div>
      </React.Fragment>
    );
  }
}

SignupStep1.propTypes = propTypes;
SignupStep1.defaultProps = defaultProps;
