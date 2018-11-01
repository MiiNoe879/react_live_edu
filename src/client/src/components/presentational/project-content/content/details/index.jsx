import styles from "./details.scss";
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ProjectRating from "components/presentational/project-rating";
import EnglishIcon from "../../../../../assets/img/flags/en-us.png";
import GameDevIcon from "../../../../../assets/img/categories/game-development.svg";
import UnityIcon from "../../../../../assets/img/sub-categories/unity.svg";

const propTypes = {};

const defaultProps = {};

export default function Details(props) {
  return (
    <div className={styles.details}>
      <h2 className={styles.title}>Building a Game on Unity Engine</h2>

      <ul className={styles.list}>
        <li className={`${styles.item} ${styles.paddingTop}`}>
          <img src={EnglishIcon} alt="Language icon" width="21" height="11" />
          <span className={styles.itemText}>English</span>
        </li>
        <li className={`${styles.item} ${styles.paddingTop}`}>
          <img src={GameDevIcon} />
          <span className={styles.itemText}>Game Development</span>
        </li>
        <li className={`${styles.item} ${styles.paddingTop}`}>
          <img src={UnityIcon} />
          <span className={styles.itemText}>Unity</span>
        </li>
        <li className={styles.item}>
          <ProjectRating avarage={4.3} total={560} name="iDke4s" />
        </li>
      </ul>

      <p className={styles.text}>
        This tutorial will demonstrate how we will build a Quora like web app
        using Django web framework. In this project focus will be more on
        learning Django.
      </p>

      <Link to="#" className={styles.button}>
        Download Project Files
      </Link>
    </div>
  );
}

Details.propTypes = propTypes;
Details.defaultProps = defaultProps;
