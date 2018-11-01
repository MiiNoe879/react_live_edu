import styles from "./auth-buttons.scss";
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const propTypes = {};

const defaultProps = {};

export default function AuthButtons(props) {
  return (
    <React.Fragment>
      <Link to="/login" className={`${styles.link} ${styles.login}`}>
        Log In
      </Link>
      <Link to="/signup" className={`${styles.link} ${styles.signup}`}>
        Sign Up
      </Link>
    </React.Fragment>
  );
}

AuthButtons.propTypes = propTypes;
AuthButtons.defaultProps = defaultProps;
