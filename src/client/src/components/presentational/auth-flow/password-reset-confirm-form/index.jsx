import styles from "./password-reset-confirm-form.scss";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  submitPasswordResetConfirmForm,
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
    resetPasswordAction: (password, passwordConfirm, uid, token) =>
      dispatch(
        submitPasswordResetConfirmForm(password, passwordConfirm, uid, token)
      )
  })
)
export default class PasswordResetConfirmForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      passwordConfirm: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const { clearErrorAction, resetPasswordAction, uid, token } = this.props;
    const { password, passwordConfirm } = this.state;

    clearErrorAction();

    if (password.length && passwordConfirm.length) {
      event.preventDefault();
      resetPasswordAction(password, passwordConfirm, uid, token);
    }
  }

  render() {
    const { error, clearErrorAction } = this.props;

    return (
      <form className={styles.form}>
        {error && <FormError error={error} clearError={clearErrorAction} />}

        <div className={styles.formGroup}>
          <input
            name="password"
            type="password"
            className={styles.formInput}
            required={true}
            placeholder="Password"
            value={this.state.password}
            onChange={event => this.setState({ password: event.target.value })}
            maxLength={MAX_LENGTH_LIMIT}
          />
          <input
            name="passwordConfirm"
            type="password"
            className={styles.formInput}
            required={true}
            placeholder="Confirm Password"
            value={this.state.passwordConfirm}
            onChange={event =>
              this.setState({ passwordConfirm: event.target.value })
            }
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

PasswordResetConfirmForm.propTypes = propTypes;
PasswordResetConfirmForm.defaultProps = defaultProps;
