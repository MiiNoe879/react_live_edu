import styles from "./nav-link.scss";
import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.node,
  modClassName: PropTypes.string
};

const defaultProps = {};

export default function NavigationLink(props) {
  return (
    <NavLink
      to={props.to}
      className={
        props.modClassName
          ? `${styles.link} ${styles[props.modClassName]}`
          : styles.link
      }
      activeClassName={styles.active}
    >
      <div className={styles.icon}>{props.icon}</div>
      {props.title}
    </NavLink>
  );
}

NavigationLink.propTypes = propTypes;
NavigationLink.defaultProps = defaultProps;
