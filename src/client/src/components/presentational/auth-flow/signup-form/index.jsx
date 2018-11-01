import styles from "./signup-form.scss";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { MAX_LENGTH_LIMIT } from "store/app/constants";
import { clearSignupStep0Error, submitSignupStep0 } from "store/auth/actions";
import FormError from "components/presentational/auth-flow/form-error";

const propTypes = {};

const defaultProps = {};

@connect(
  (state, props) => ({
    error: state.auth.getIn(["signupStep0", "error"])
  }),
  dispatch => ({
    clearErrorAction: () => dispatch(clearSignupStep0Error()),
    submitSignupStep0Action: (email, password, passwordConfirm) =>
      dispatch(submitSignupStep0(email, password, passwordConfirm))
  })
)
export default class SignupForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      passwordConfirm: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const { clearErrorAction, submitSignupStep0Action } = this.props;
    const { email, password, passwordConfirm } = this.state;

    clearErrorAction();

    if (email.length && password.length && passwordConfirm.length) {
      event.preventDefault();
      submitSignupStep0Action(email, password, passwordConfirm);
    }
  }

  render() {
    const { error, clearErrorAction } = this.props;

    return (
      <form className={styles.form}>
        {error && <FormError error={error} clearError={clearErrorAction} />}

        <input
          name="email"
          component="input"
          type="email"
          className={styles.formInput}
          required={true}
          placeholder="Email"
          maxLength={MAX_LENGTH_LIMIT}
          value={this.state.email}
          onChange={event => this.setState({ email: event.target.value })}
        />
        <input
          name="password"
          component="input"
          type="password"
          className={styles.formInput}
          required={true}
          placeholder="Password"
          maxLength={MAX_LENGTH_LIMIT}
          value={this.state.password}
          onChange={event => this.setState({ password: event.target.value })}
        />
        <input
          name="passwordConfirm"
          component="input"
          type="password"
          className={styles.formInput}
          required={true}
          placeholder="Confirm Password"
          maxLength={MAX_LENGTH_LIMIT}
          value={this.state.passwordConfirm}
          onChange={event =>
            this.setState({ passwordConfirm: event.target.value })
          }
        />
        <button
          className={styles.formButton}
          type="submit"
          onClick={this.handleSubmit}
        >
          Start Learning
        </button>
      </form>
    );
  }
}

SignupForm.propTypes = propTypes;
SignupForm.defaultProps = defaultProps;
