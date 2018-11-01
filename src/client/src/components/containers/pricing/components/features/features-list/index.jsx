import styles from "./features-list.scss";
import React from "react";
import PropTypes from "prop-types";
import ListLeftIcon01 from "../../../../../../assets/img/pricing/icon-feature-01.svg";
import ListLeftIcon02 from "../../../../../../assets/img/pricing/icon-feature-02.svg";
import ListLeftIcon03 from "../../../../../../assets/img/pricing/icon-feature-03.svg";
import ListLeftIcon04 from "../../../../../../assets/img/pricing/icon-feature-04.svg";
import ListLeftIcon05 from "../../../../../../assets/img/pricing/icon-feature-05.svg";
import ListLeftIcon06 from "../../../../../../assets/img/pricing/icon-feature-06.svg";
import ListLeftIcon07 from "../../../../../../assets/img/pricing/icon-feature-07.svg";
import ListLeftIcon08 from "../../../../../../assets/img/pricing/icon-feature-08.svg";

const propTypes = {};

const defaultProps = {};

const featuresListLeft = [
  {
    icon: <img src={ListLeftIcon01} />,
    text: "On-demand projects"
  },
  {
    icon: <img src={ListLeftIcon02} />,
    text: "No ads"
  },
  {
    icon: <img src={ListLeftIcon03} />,
    text: "Request custom projects"
  },
  {
    icon: <img src={ListLeftIcon04} />,
    text: "Receive rewards in LEDU for student activities"
  }
];

const featuresListRight = [
  {
    icon: <img src={ListLeftIcon05} />,
    text: "Watch in full HD"
  },
  {
    icon: <img src={ListLeftIcon06} />,
    text: "Download project files and videos"
  },
  {
    icon: <img src={ListLeftIcon07} />,
    text: "Chat with project creators"
  },
  {
    icon: <img src={ListLeftIcon08} />,
    text: "Donate LEDU to a project creator"
  }
];

export default function FeaturesList(props) {
  const renderFeature = function(feature, index) {
    return (
      <li className={styles.item} key={index}>
        <div className={styles.icon}>{feature.icon}</div>
        <p className={styles.text}>{feature.text}</p>
      </li>
    );
  };

  return (
    <div className={styles.list}>
      <ul className={`${styles.items} ${styles.itemsLeft}`}>
        {featuresListLeft.map((feature, index) =>
          renderFeature(feature, index)
        )}
      </ul>
      <ul className={`${styles.items} ${styles.itemsRight}`}>
        {featuresListRight.map((feature, index) =>
          renderFeature(feature, index)
        )}
      </ul>
    </div>
  );
}

FeaturesList.propTypes = propTypes;
FeaturesList.defaultProps = defaultProps;
