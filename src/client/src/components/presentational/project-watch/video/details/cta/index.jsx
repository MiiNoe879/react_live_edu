import styles from "./cta.scss";
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

const propTypes = {};

const defaultProps = {};

export default function Cta(props) {
  return (
    <div className={styles.buttons}>
      <div className={styles.left}>
        <Link to="#" className={`${styles.cta} ${styles.ghost}`}>
          <FontAwesomeIcon icon="download" className={styles.icon} />Download
        </Link>

        <button className={`${styles.cta} ${styles.empty}`}>
          <FontAwesomeIcon icon="share-alt" className={styles.icon} />Share
        </button>
      </div>

      <div className={styles.right}>
        <button className={`${styles.cta} ${styles.ghost} ${styles.follow}`}>
          Follow Project
        </button>

        <button className={`${styles.cta} ${styles.full} ${styles.donate}`}>
          Donate
        </button>
      </div>
    </div>
  );
}

Cta.propTypes = propTypes;
Cta.defaultProps = defaultProps;
