import styles from "./step-4.scss";
import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { SIGNUP_STEP_ERROR_URL } from "store/auth/constants";
import LoginSingupHeader from "components/presentational/auth-flow/login-signup-header";

const propTypes = {};

const defaultProps = {};

@connect((state, props) => ({
  confirmEmail: state.auth.getIn(["confirmEmail", "email"])
}))
export default class SignupStep4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { confirmEmail } = this.props;

    if (!confirmEmail) {
      return <Redirect to={SIGNUP_STEP_ERROR_URL} />;
    }

    return (
      <React.Fragment>
        <LoginSingupHeader
          title="Verify Your E-mail Address"
          text="We have sent an e-mail to you for verification. Follow the link provided to finalize the signup process."
        />

        <div className={styles.form}>
          <p>
            We have sent an email to <b>{confirmEmail}</b>
          </p>
          <p>
            Check your inbox to confirm your registration email. If you do not
            find it in there wait for 5 minutes and then check again. Also check
            your spam box. If still you did not receive it, send a support
            request.
          </p>
        </div>
      </React.Fragment>
    );
  }
}

SignupStep4.propTypes = propTypes;
SignupStep4.defaultProps = defaultProps;
