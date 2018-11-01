import styles from "./guest-nav-links.scss";
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Subscribe from "../../../../assets/img/icons/main-nav-subscribe.svg";

const propTypes = {};

const defaultProps = {};

export default function GuestNavLinks(props) {
  return (
    <div className={styles.links}>
      <Link to="/live" className={`${styles.link} ${styles.linkLive}`}>
        Learn Live!
        <span className={styles.liveDot} />
      </Link>
      <span className={styles.divider} />
      <Link to="/projects" className={`${styles.link} ${styles.linkProjects}`}>
        Learn on Demand
      </Link>
      <span className={styles.divider} />
      <Link to="/pricing" className={`${styles.link} ${styles.linkPricing}`}>
        <img src={Subscribe} className={styles.icon} />
        Pricing
      </Link>
    </div>
  );
}

GuestNavLinks.propTypes = propTypes;
GuestNavLinks.defaultProps = defaultProps;
