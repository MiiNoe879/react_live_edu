import styles from "./signup-contact-form.scss";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { MAX_LENGTH_LIMIT } from "store/app/constants";
import {
  signUpStepSetSkype,
  signUpStepSetHangouts,
  setSignupStep3Error,
  clearSignupStep3Error,
  signUp,
  signUpSocial
} from "store/auth/actions";
import FormError from "components/presentational/auth-flow/form-error";

const propTypes = {};

const defaultProps = {};

@connect(
  (state, props) => ({
    error: state.auth.getIn(["signupStep3", "error"]),
    socialSignupToken: state.auth.getIn(["signupSocial", "access_token"])
  }),
  dispatch => ({
    setSkypeAction: skype => dispatch(signUpStepSetSkype(skype)),
    setHangoutsAction: hangouts => dispatch(signUpStepSetHangouts(hangouts)),
    clearErrorAction: () => dispatch(clearSignupStep3Error()),
    setErrorAction: error => dispatch(setSignupStep3Error(error)),
    signUpAction: () => dispatch(signUp()),
    signUpSocialAction: () => dispatch(signUpSocial())
  })
)
export default class SignupContactForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      skype: "",
      hangouts: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const { skype, hangouts } = this.state;
    const {
      setSkypeAction,
      setHangoutsAction,
      clearErrorAction,
      setErrorAction,
      signUpAction,
      socialSignupToken,
      signUpSocialAction
    } = this.props;

    event.preventDefault();

    if (!skype.length && !hangouts.length) {
      setErrorAction(["At least one contact is required"]);
    } else {
      clearErrorAction();

      if (skype.length) {
        setSkypeAction(skype);
      }
      if (hangouts.length) {
        setHangoutsAction(hangouts);
      }

      if (socialSignupToken) {
        signUpSocialAction();
      } else {
        signUpAction();
      }
    }
  }

  render() {
    const { error, clearErrorAction } = this.props;

    return (
      <form className={styles.form}>
        {error && <FormError error={error} clearError={clearErrorAction} />}

        <input
          name="skype"
          type="text"
          className={styles.formInput}
          placeholder="Enter your Skype"
          value={this.state.skype}
          onChange={event => this.setState({ skype: event.target.value })}
          maxLength={MAX_LENGTH_LIMIT}
        />

        <input
          name="hangouts"
          type="text"
          className={styles.formInput}
          placeholder="Enter your Google Hangouts"
          value={this.state.hangouts}
          onChange={event => this.setState({ hangouts: event.target.value })}
          maxLength={MAX_LENGTH_LIMIT}
        />

        <button
          className={styles.formButton}
          type="submit"
          onClick={this.handleSubmit}
        >
          Next
        </button>
      </form>
    );
  }
}

SignupContactForm.propTypes = propTypes;
SignupContactForm.defaultProps = defaultProps;
