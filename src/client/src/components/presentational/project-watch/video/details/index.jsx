import styles from "./details.scss";
import React from "react";
import PropTypes from "prop-types";
import Info from "./info";
import Cta from "./cta";

const propTypes = {};

const defaultProps = {};

export default function Details(props) {
  return (
    <div className={styles.details}>
      <div className={styles.avatar}>
        <img
          className={styles.avatarImg}
          src="http://via.placeholder.com/42x42"
          alt="Avatar"
        />
      </div>

      <div className={styles.content}>
        <Info />
        <Cta />
      </div>
    </div>
  );
}

Details.propTypes = propTypes;
Details.defaultProps = defaultProps;
