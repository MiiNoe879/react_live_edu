import styles from "./step-error.scss";
import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { SIGNUP_STEP_ERROR_URL } from "store/auth/constants";
import { clearSignupFormError } from "store/auth/actions";
import LoginSingupHeader from "components/presentational/auth-flow/login-signup-header";
import FormError from "components/presentational/auth-flow/form-error";

const propTypes = {};

const defaultProps = {};

@connect(
  (state, props) => ({
    signupFormError: state.auth.getIn(["signupForm", "error"])
  }),
  dispatch => ({
    clearErrorAction: () => dispatch(clearSignupFormError())
  })
)
export default class SignupStepError extends React.Component {
  renderErrorMessage(errors, clearErrorAction) {
    const result = [];

    {
      Object.keys(errors).forEach(key =>
        result.push(`${key}: ${errors[key][0]}`)
      );
    }

    return <FormError error={result} clearError={clearErrorAction} />;
  }
  render() {
    const { signupFormError, clearErrorAction } = this.props;

    if (!signupFormError) {
      return <Redirect to={SIGNUP_STEP_ERROR_URL} />;
    }

    return (
      <React.Fragment>
        <LoginSingupHeader
          title="Ouch!"
          text="This shouldn't happen! Try to reload the page and if this doesn't help contact our support."
        />

        <div className={styles.form}>
          {this.renderErrorMessage(signupFormError, clearErrorAction)}
        </div>
      </React.Fragment>
    );
  }
}

SignupStepError.propTypes = propTypes;
SignupStepError.defaultProps = defaultProps;
