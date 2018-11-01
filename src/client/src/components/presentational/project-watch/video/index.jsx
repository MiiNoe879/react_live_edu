import styles from "./video.scss";
import React from "react";
import PropTypes from "prop-types";
import Player from "components/presentational/project-watch/video/player";
import Details from "components/presentational/project-watch/video/details";

const propTypes = {};

const defaultProps = {};

export default function Video(props) {
  return (
    <div className={styles.video}>
      <Player />
      <Details />
    </div>
  );
}

Video.propTypes = propTypes;
Video.defaultProps = defaultProps;
