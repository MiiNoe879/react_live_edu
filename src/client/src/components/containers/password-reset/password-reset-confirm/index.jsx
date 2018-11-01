import styles from "./password-reset-confirm.scss";
import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import GuestLayout from "components/containers/app/guest-layout";
import LoginSingupHeader from "components/presentational/auth-flow/login-signup-header";
import PasswordResetConfirmForm from "components/presentational/auth-flow/password-reset-confirm-form";

const propTypes = {};

const defaultProps = {};

@connect((state, props) => ({
  passwordConfirmed: state.auth.getIn(["passwordReset", "confirmed"])
}))
export default class PasswordResetConfirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToLogin: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ redirectToLogin: true });
  }

  render() {
    const { redirectToLogin } = this.state;
    const { passwordConfirmed } = this.props;
    const uid = this.props.match.params.uid;
    const token = this.props.match.params.token;

    if (redirectToLogin) {
      return <Redirect to="/login" />;
    }

    return (
      <GuestLayout>
        <div className={styles.passwordReset}>
          <div className={styles.container}>
            <LoginSingupHeader
              title={passwordConfirmed ? "Congratulations" : "Change password"}
              text={passwordConfirmed && "Your password was changed"}
            />

            <div className={styles.form}>
              {passwordConfirmed ? (
                <React.Fragment>
                  <p className={styles.formTitle}>
                    Now you can login using your credentials
                  </p>
                  <button
                    className={styles.formButton}
                    onClick={this.handleClick}
                  >
                    Go to Login page
                  </button>
                </React.Fragment>
              ) : (
                <PasswordResetConfirmForm uid={uid} token={token} />
              )}
            </div>
          </div>
        </div>
      </GuestLayout>
    );
  }
}

PasswordResetConfirm.propTypes = propTypes;
PasswordResetConfirm.defaultProps = defaultProps;
