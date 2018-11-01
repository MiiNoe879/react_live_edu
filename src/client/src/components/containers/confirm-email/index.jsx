import styles from "./confirm-email.scss";
import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { confirmEmail } from "store/auth/actions";
import GuestLayout from "components/containers/app/guest-layout";
import LoginSingupHeader from "components/presentational/auth-flow/login-signup-header";

const propTypes = {};

const defaultProps = {};

@connect(
  (state, props) => ({
    emailConfirmed: state.auth.getIn(["confirmEmail", "confirmed"])
  }),
  dispatch => ({
    confirmEmailAction: key => dispatch(confirmEmail({ key: key }))
  })
)
export default class ConfirmEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToLogin: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const activationKey = this.props.match.params.key;

    if (activationKey) {
      this.props.confirmEmailAction(activationKey);
    }
  }

  handleClick() {
    this.setState({ redirectToLogin: true });
  }

  render() {
    const { redirectToLogin } = this.state;
    const { emailConfirmed } = this.props;

    if (redirectToLogin) {
      return <Redirect to="/login" />;
    }

    return (
      <GuestLayout>
        <div className={styles.confirmEmail}>
          <div className={styles.container}>
            <LoginSingupHeader
              title={
                emailConfirmed
                  ? "Congratulations"
                  : "Confirming your email address"
              }
              text={
                emailConfirmed
                  ? "Your email address was confirmed"
                  : "We're confirming your email address. Please wait until the process finishes."
              }
            />

            {emailConfirmed && (
              <div className={styles.form}>
                <p className={styles.formTitle}>
                  Now you can login using your credentials
                </p>
                <button
                  className={styles.formButton}
                  onClick={this.handleClick}
                >
                  Go to Login page
                </button>
              </div>
            )}
          </div>
        </div>
      </GuestLayout>
    );
  }
}

ConfirmEmail.propTypes = propTypes;
ConfirmEmail.defaultProps = defaultProps;
