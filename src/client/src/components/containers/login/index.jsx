import styles from "./login.scss";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { LOGIN_SUCCESS_URL, SIGNUP_SOCIAL_ERRORS } from "store/auth/constants";
import GuestLayout from "components/containers/app/guest-layout";
import Logo from "../../../assets/img/icons/live-edu-glyph-v01.svg";
import LoginSingupHeader from "components/presentational/auth-flow/login-signup-header";
import LoginSignupSocial from "components/presentational/auth-flow/login-signup-social";
import LoginForm from "components/presentational/auth-flow/login-form";

const propTypes = {};

const defaultProps = {};

@connect((state, props) => ({
  user: state.auth.get("user"),
  signupSocialError: state.auth.getIn(["signupSocial", "error"])
}))
export default class Login extends React.Component {
  render() {
    const { user, signupSocialError } = this.props;

    if (user) {
      return <Redirect to={LOGIN_SUCCESS_URL} />;
    }

    if (
      signupSocialError ===
      SIGNUP_SOCIAL_ERRORS.SOCIAL_ACCOUNT_IS_NOT_CONNECTED.type
    ) {
      return <Redirect to={"/signup/step-1"} />;
    }

    return (
      <GuestLayout>
        <div className={styles.login}>
          <div className={styles.container}>
            <LoginSingupHeader
              logo={<img src={Logo} />}
              title="Log In"
              text="Enter your account"
            />

            <div className={styles.form}>
              <div className={styles.formLeft}>
                <p className={styles.formText}>Log in with social</p>

                <LoginSignupSocial />
              </div>

              <div className={styles.formDivider} />

              <div className={styles.formRight}>
                <p className={styles.formText}>Log in with email</p>

                <LoginForm />

                <Link to="/password-reset" className={styles.formLink}>
                  Forgot Password?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </GuestLayout>
    );
  }
}

Login.propTypes = propTypes;
Login.defaultProps = defaultProps;
