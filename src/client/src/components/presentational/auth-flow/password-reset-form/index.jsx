import styles from "./password-reset-form.scss";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  submitPasswordResetForm,
  clearPasswordResetError
} from "store/auth/actions";
import { MAX_LENGTH_LIMIT } from "store/app/constants";
import FormError from "components/presentational/auth-flow/form-error";

const propTypes = {};

const defaultProps = {};

@connect(
  (state, props) => ({
    error: state.auth.getIn(["passwordReset", "error"])
  }),
  dispatch => ({
    clearErrorAction: () => dispatch(clearPasswordResetError()),
    submitPasswordResetFormAction: email =>
      dispatch(submitPasswordResetForm({ email }))
  })
)
export default class PasswordResetForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const { clearErrorAction, submitPasswordResetFormAction } = this.props;
    const { email } = this.state;

    clearErrorAction();

    if (email.length) {
      event.preventDefault();
      submitPasswordResetFormAction(email);
    }
  }

  render() {
    const { error, clearErrorAction } = this.props;

    return (
      <form className={styles.form}>
        {error && <FormError error={error} clearError={clearErrorAction} />}

        <div className={styles.formGroup}>
          <input
            name="email"
            type="email"
            className={styles.formInput}
            required={true}
            placeholder="Email"
            value={this.state.email}
            onChange={event => this.setState({ email: event.target.value })}
            maxLength={MAX_LENGTH_LIMIT}
          />
        </div>

        <button
          className={styles.formButton}
          type="submit"
          onClick={this.handleSubmit}
        >
          Reset
        </button>
      </form>
    );
  }
}

PasswordResetForm.propTypes = propTypes;
PasswordResetForm.defaultProps = defaultProps;
