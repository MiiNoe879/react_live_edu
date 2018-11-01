import styles from "./form-error.scss";
import React from "react";
import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

const propTypes = {};

const defaultProps = {};

export default function FormError(props) {
  const { error, clearError } = props;

  return error ? (
    <div className={styles.formError}>
      {error.map(item => (
        <p className={styles.formErrorText} key={item}>
          {item}
        </p>
      ))}

      <span className={styles.formErrorButton} onClick={clearError}>
        <FontAwesomeIcon icon="times" className={styles.icon} />
      </span>
    </div>
  ) : null;
}

FormError.propTypes = propTypes;
FormError.defaultProps = defaultProps;
