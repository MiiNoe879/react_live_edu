import styles from "./nav.scss";
import React from "react";
import PropTypes from "prop-types";
import ChatIcon from "../../../../../assets/img/icons/tab-chat.svg";
import PlaylistIcon from "../../../../../assets/img/icons/tab-playlist.svg";

const propTypes = {};

const defaultProps = {};

export default function Nav(props) {
  return (
    <div className={styles.nav}>
      <button className={`${styles.button} ${styles.active}`}>
        <img src={ChatIcon} className={styles.icon} />Chat
      </button>
      <button className={styles.button}>
        <img src={PlaylistIcon} className={styles.icon} />Playlist
      </button>
    </div>
  );
}

Nav.propTypes = propTypes;
Nav.defaultProps = defaultProps;
