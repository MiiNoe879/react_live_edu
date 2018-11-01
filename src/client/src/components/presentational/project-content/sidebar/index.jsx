import styles from "./sidebar.scss";
import React from "react";
import PropTypes from "prop-types";
import Schedule from "./schedule";
import RecommendedProjects from "./recommended-projects";

const propTypes = {};

const defaultProps = {};

export default function Sidebar(props) {
  return (
    <div className={styles.sidebar}>
      <Schedule />
      <RecommendedProjects />
    </div>
  );
}

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;
