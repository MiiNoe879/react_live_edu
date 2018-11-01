import styles from "./playlist.scss";
import React from "react";
import PropTypes from "prop-types";

const propTypes = {};

const defaultProps = {};

export default function ProjectPlaylist(props) {
  return <div className={styles.projectPlaylist}>I'm playlist</div>;
}

ProjectPlaylist.propTypes = propTypes;
ProjectPlaylist.defaultProps = defaultProps;
