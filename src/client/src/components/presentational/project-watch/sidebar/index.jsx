import styles from "./sidebar.scss";
import React from "react";
import PropTypes from "prop-types";
import Nav from "components/presentational/project-watch/sidebar/nav";
import Chat from "components/presentational/project-watch/sidebar/chat";
import Playlist from "components/presentational/project-watch/sidebar/playlist";

const propTypes = {};

const defaultProps = {};

export default function Sidebar(props) {
  return (
    <div className={styles.sidebar}>
      <Nav />
      <Chat />
      <Playlist />
    </div>
  );
}

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;
