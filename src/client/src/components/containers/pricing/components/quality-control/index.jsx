import styles from "./quality-control.scss";
import React from "react";
import PropTypes from "prop-types";
import Icon from "../../../../../assets/img/icons/quality-control.svg";

const propTypes = {};

const defaultProps = {};

export default function QualityControl(props) {
  return (
    <section className={styles.quality}>
      <div className={styles.container}>
        <img src={Icon} className={styles.icon} />
        <h2 className={styles.title}>
          Our projects are moderated by a certified Quality Control Pro
        </h2>
        <p className={styles.text}>
          Only the HQ videos will be stored for subscribed users. Your success
          is our success. We give you only the best projects.
        </p>
      </div>
    </section>
  );
}

QualityControl.propTypes = propTypes;
QualityControl.defaultProps = defaultProps;
