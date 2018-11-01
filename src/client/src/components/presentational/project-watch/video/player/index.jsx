import styles from "./player.scss";
import React from "react";
import PropTypes from "prop-types";

const propTypes = {};

const defaultProps = {};

export default function Player(props) {
  return (
    <div className={styles.player}>
      <div className={styles.container}>
        <img
          className={styles.splashscreen}
          src="http://via.placeholder.com/1920x1080"
          alt="Project Splashcreen"
        />
      </div>
    </div>
  );
}

Player.propTypes = propTypes;
Player.defaultProps = defaultProps;
