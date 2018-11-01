import styles from "./project-watch.scss";
import React from "react";
import PropTypes from "prop-types";
import Video from "components/presentational/project-watch/video";
import Sidebar from "components/presentational/project-watch/sidebar";

const propTypes = {};

const defaultProps = {};

export default function ProjectWatch(props) {
  return (
    <div className={styles.projectWatch}>
      <div className={styles.projectWatchContainer}>
        <Video />
        <Sidebar />
      </div>
    </div>
  );
}

ProjectWatch.propTypes = propTypes;
ProjectWatch.defaultProps = defaultProps;
