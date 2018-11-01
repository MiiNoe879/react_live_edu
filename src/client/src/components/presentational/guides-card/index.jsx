import styles from "./guides-card.scss";
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Heart from "../../../assets/img/icons/icon-heart.svg";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

const propTypes = {
  thumbnailUrl: PropTypes.string,
  followers: PropTypes.number.isRequired,
  projects: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
};

const defaultProps = {};

export default function GuidesCard(props) {
  const renderCardDescription = function() {
    return (
      <React.Fragment>
        <div className={styles.counts}>
          <div className={styles.followers}>
            <img src={Heart} className={styles.icon} />
            <span className={styles.value}>{props.followers}</span>
          </div>
          <div className={styles.projects}>
            <FontAwesomeIcon icon="folder" className={styles.icon} />
            <span className={styles.value}>{props.projects}</span>
          </div>
        </div>
      </React.Fragment>
    );
  };

  return (
    <Link to="#" className={styles.card}>
      <img
        src={props.thumbnailUrl}
        className={styles.thumb}
        alt="Guide thumbnail"
      />
      <p className={styles.title}>{props.title}</p>
      <div className={styles.desc}>{renderCardDescription()}</div>
    </Link>
  );
}

GuidesCard.propTypes = propTypes;
GuidesCard.defaultProps = defaultProps;
