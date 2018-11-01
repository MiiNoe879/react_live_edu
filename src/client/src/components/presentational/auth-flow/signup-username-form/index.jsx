import styles from "./signup-username-form.scss";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { submitSignupStep1, clearSignupStep1Error } from "store/auth/actions";
import { MAX_LENGTH_LIMIT } from "store/app/constants";
import FormError from "components/presentational/auth-flow/form-error";

const propTypes = {};

const defaultProps = {};

@connect(
  (state, props) => ({
    error: state.auth.getIn(["signupStep1", "error"])
  }),
  dispatch => ({
    clearErrorAction: () => dispatch(clearSignupStep1Error()),
    submitSignupStep1Action: username => dispatch(submitSignupStep1(username))
  })
)
export default class SignupUsernameForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const { clearErrorAction, submitSignupStep1Action } = this.props;
    const { username } = this.state;

    clearErrorAction();

    if (username.length) {
      event.preventDefault();
      submitSignupStep1Action(username);
    }
  }

  render() {
    const { error, clearErrorAction } = this.props;

    return (
      <form className={styles.form}>
        {error && <FormError error={error} clearError={clearErrorAction} />}

        <div className={styles.formGroup}>
          <input
            name="username"
            type="text"
            className={styles.formInput}
            required={true}
            placeholder="Username (ex. SammyJohns)"
            value={this.state.username}
            onChange={event => this.setState({ username: event.target.value })}
            maxLength={MAX_LENGTH_LIMIT}
          />
        </div>

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

SignupUsernameForm.propTypes = propTypes;
SignupUsernameForm.defaultProps = defaultProps;
