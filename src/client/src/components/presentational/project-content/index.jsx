import styles from "./project-content.scss";
import React from "react";
import PropTypes from "prop-types";
import Content from "components/presentational/project-content/content";
import Sidebar from "components/presentational/project-content/sidebar";

const propTypes = {};

const defaultProps = {};

export default function ProjectContent(props) {
  return (
    <div className={styles.projectContent}>
      <Content />
      <Sidebar />
    </div>
  );
}

ProjectContent.propTypes = propTypes;
ProjectContent.defaultProps = defaultProps;
