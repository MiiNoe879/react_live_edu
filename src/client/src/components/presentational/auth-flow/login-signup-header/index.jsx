import styles from "./login-signup-header.scss";
import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  logo: PropTypes.node,
  title: PropTypes.string,
  text: PropTypes.string
};

const defaultProps = {};

export default function LoginSignupHeader(props) {
  return (
    <div className={styles.header}>
      {props.logo && <div className={styles.logo}>{props.logo}</div>}
      {props.title && <h2 className={styles.title}>{props.title}</h2>}
      {props.text && <p className={styles.text}>{props.text}</p>}
    </div>
  );
}

LoginSignupHeader.propTypes = propTypes;
LoginSignupHeader.defaultProps = defaultProps;
