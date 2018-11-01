import styles from "./signup-step-0.scss";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { SIGNUP_SOCIAL_ERRORS } from "store/auth/constants";
import {
  clearSignupSteps,
  clearSignupFormError,
  clearConfirmEmail
} from "store/auth/actions";
import Logo from "../../../../assets/img/icons/live-edu-glyph-v01.svg";
import LoginSingupHeader from "components/presentational/auth-flow/login-signup-header";
import LoginSignupSocial from "components/presentational/auth-flow/login-signup-social";
import SignupForm from "components/presentational/auth-flow/signup-form";

const propTypes = {};

const defaultProps = {};

@connect(
  (state, props) => ({
    email: state.auth.getIn(["signupStep0", "email"]),
    password: state.auth.getIn(["signupStep0", "password"]),
    passwordConfirm: state.auth.getIn(["signupStep0", "passwordConfirm"]),
    signupSocialError: state.auth.getIn(["signupSocial", "error"])
  }),
  dispatch => ({
    clearSignupStepsAction: () => dispatch(clearSignupSteps()),
    clearSignupFormErrorAction: () => dispatch(clearSignupFormError()),
    clearConfirmEmailAction: () => dispatch(clearConfirmEmail())
  })
)
export default class SignupStep0 extends React.Component {
  componentDidMount() {
    this.props.clearSignupStepsAction();
    this.props.clearSignupFormErrorAction();
    this.props.clearConfirmEmailAction();
  }

  render() {
    const { email, password, passwordConfirm, signupSocialError } = this.props;

    if (email && password && passwordConfirm) {
      return <Redirect to="/signup/step-1" />;
    }

    if (
      signupSocialError ===
      SIGNUP_SOCIAL_ERRORS.SOCIAL_ACCOUNT_IS_NOT_CONNECTED.type
    ) {
      return <Redirect to={"/signup/step-1"} />;
    }

    return (
      <React.Fragment>
        <LoginSingupHeader
          logo={<img src={Logo} />}
          title="Create an account"
          text="Choose your preferred sign up method"
        />

        <div className={styles.form}>
          <div className={styles.formLeft}>
            <p className={styles.formText}>Sign up with social</p>

            <LoginSignupSocial />
          </div>

          <div className={styles.formDivider} />

          <div className={styles.formRight}>
            <p className={styles.formText}>Sign up with email</p>

            <SignupForm />
          </div>
        </div>

        <p className={styles.caption}>
          By clicking Sign up you are acknowledging that you agree to our{" "}
          <Link className={styles.captionLink} to="/terms">
            Terms and Conditions
          </Link>{" "}
          when using our product.
        </p>
      </React.Fragment>
    );
  }
}

SignupStep0.propTypes = propTypes;
SignupStep0.defaultProps = defaultProps;
