import styles from "./info.scss";
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

const propTypes = {};

const defaultProps = {};

export default function Info(props) {
  return (
    <div className={styles.info}>
      <div className={styles.left}>
        <p className={styles.title}>
          Introduction to "Building a Video Game on Unity Engine"
        </p>

        <p className={styles.text}>
          with{" "}
          <Link to="#" className={styles.user}>
            Joselyn Zane
          </Link>
          <span className={styles.divider}>|</span>4 years experience
          <span className={styles.divider}>|</span>Unity
        </p>
      </div>

      <div className={styles.right}>
        <span className={styles.counter}>
          <FontAwesomeIcon icon="users" className={styles.icon} />84,848
        </span>
      </div>
    </div>
  );
}

Info.propTypes = propTypes;
Info.defaultProps = defaultProps;
