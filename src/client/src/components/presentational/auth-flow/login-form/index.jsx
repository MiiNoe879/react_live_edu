import styles from "./login-form.scss";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logIn, clearLoginFormError } from "store/auth/actions";
import { MAX_LENGTH_LIMIT } from "store/app/constants";
import FormError from "components/presentational/auth-flow/form-error";

const propTypes = {};

const defaultProps = {};

@connect(
  (state, props) => ({
    error: state.auth.getIn(["loginForm", "error"])
  }),
  dispatch => ({
    clearErrorAction: () => dispatch(clearLoginFormError()),
    logInAction: (username, password) => dispatch(logIn(username, password))
  })
)
export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const { logInAction, clearErrorAction } = this.props;
    const { username, password } = this.state;

    clearErrorAction();

    if (username.length && password.length) {
      event.preventDefault();
      logInAction(username, password);
    }
  }

  render() {
    const { error, clearErrorAction } = this.props;

    return (
      <form className={styles.form}>
        {error && (
          <FormError
            error={error.non_field_errors}
            clearError={clearErrorAction}
          />
        )}

        <input
          name="username"
          component="input"
          type="text"
          className={styles.formInput}
          required={true}
          placeholder="Email"
          maxLength={MAX_LENGTH_LIMIT}
          value={this.state.username}
          onChange={event => this.setState({ username: event.target.value })}
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
        <button
          className={styles.formButton}
          type="submit"
          onClick={this.handleSubmit}
        >
          Enter
        </button>
      </form>
    );
  }
}

LoginForm.propTypes = propTypes;
LoginForm.defaultProps = defaultProps;
