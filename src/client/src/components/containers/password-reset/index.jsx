import styles from "./password-reset.scss";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import GuestLayout from "components/containers/app/guest-layout";
import LoginSingupHeader from "components/presentational/auth-flow/login-signup-header";
import PasswordResetForm from "components/presentational/auth-flow/password-reset-form";
import Logo from "../../../assets/img/icons/live-edu-glyph-v01.svg";

const propTypes = {};

const defaultProps = {};

@connect((state, props) => ({
  email: state.auth.getIn(["passwordReset", "email"])
}))
export default class PasswordReset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { email } = this.props;

    return (
      <GuestLayout>
        <div className={styles.login}>
          <div className={styles.container}>
            <LoginSingupHeader
              logo={<img src={Logo} />}
              title="Reset your password"
              text={
                email
                  ? "We have sent an e-mail to you."
                  : "Forgotten your password? Enter your email below and we will send you an email to reset it."
              }
            />

            <div className={`${styles.form} ${email && styles.emailSent}`}>
              {email ? (
                <React.Fragment>
                  <p>
                    We have sent an email to <b>{email}</b>. Follow the link
                    provided to finalize the password reset process.
                  </p>
                  <p>
                    Please contact us if you do not receive it within a few
                    minutes.
                  </p>
                </React.Fragment>
              ) : (
                <PasswordResetForm />
              )}
            </div>
          </div>
        </div>
      </GuestLayout>
    );
  }
}

PasswordReset.propTypes = propTypes;
PasswordReset.defaultProps = defaultProps;
