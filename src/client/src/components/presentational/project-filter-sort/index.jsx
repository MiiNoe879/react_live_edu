import styles from "./project-filter-sort.scss";
import React from "react";
import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

const propTypes = {};

const defaultProps = {};

export default function ProjectFilterSort(props) {
  return (
    <div className={styles.filter}>
      <button className={styles.button}>
        <span className={styles.text}>Popular</span>{" "}
        <FontAwesomeIcon icon="eye" className={styles.icon} />
      </button>
      <button className={styles.button}>
        <span className={styles.text}>Top rated</span>{" "}
        <FontAwesomeIcon icon="thumbs-up" className={styles.icon} />
      </button>
      <button className={styles.button}>
        <span className={styles.text}>Latest</span>{" "}
        <FontAwesomeIcon icon="fire" className={styles.icon} />
      </button>
    </div>
  );
}

ProjectFilterSort.propTypes = propTypes;
ProjectFilterSort.defaultProps = defaultProps;
