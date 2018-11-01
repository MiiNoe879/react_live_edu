import styles from "./feature.scss";
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const propTypes = {};

const defaultProps = {};

export default function Feature(props) {
  const featureClassNames = classNames({
    [styles.feature]: true,
    [styles.reversed]: props.reversed
  });

  return (
    <div className={featureClassNames}>
      <div className={styles.content}>
        <h2 className={styles.title}>{props.title}</h2>
        <p className={styles.text}>{props.text}</p>
      </div>
      <div className={styles.thumbnail}>
        <img className={styles.img} src={props.imageUrl} alt="Screenshot" />
      </div>
    </div>
  );
}

Feature.propTypes = propTypes;
Feature.defaultProps = defaultProps;
