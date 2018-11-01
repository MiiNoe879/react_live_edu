import styles from "./benefits.scss";
import React from "react";
import PropTypes from "prop-types";
import IllustrationJedi from "../../../../../assets/img/pricing/illustration-jedi.svg";
import IllustrationRequest from "../../../../../assets/img/pricing/illustration-request.svg";
import IllustrationReward from "../../../../../assets/img/pricing/illustration-reward.svg";

const propTypes = {};

const defaultProps = {};

export default function Benefits(props) {
  return (
    <section className={styles.benefits}>
      <div className={styles.container}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <div className={styles.illustration}>
              <img src={IllustrationJedi} className={styles.icon} />
            </div>
            <p className={styles.title}>
              Become a Jedi in your preferred field of study
            </p>
            <p className={styles.text}>
              We provide projects for students at intermediate and advanced
              levels.
            </p>
          </li>
          <li className={styles.item}>
            <div className={styles.illustration}>
              <img src={IllustrationReward} className={styles.icon} />
            </div>
            <p className={styles.title}>Receive rewards for activity</p>
            <p className={styles.text}>
              Use your profile as a proof of your progress. Get rewards and use
              them to download content, project files, make project requests
              etc...
            </p>
          </li>
          <li className={styles.item}>
            <div className={styles.illustration}>
              <img src={IllustrationRequest} className={styles.icon} />
            </div>
            <p className={styles.title}>Request custom projects</p>
            <p className={styles.text}>
              We provide projects for students at intermediate and advanced
              levels.
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
}

Benefits.propTypes = propTypes;
Benefits.defaultProps = defaultProps;
