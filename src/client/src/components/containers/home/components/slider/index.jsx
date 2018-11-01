import styles from "./slider.scss";
import React from "react";
import PropTypes from "prop-types";
import SignupForm from "components/presentational/auth-flow/signup-form";
import LoginSignupSocial from "components/presentational/auth-flow/login-signup-social";
import IconTechnology from "../../../../../assets/img/icons/icon-technology.svg";
import IconMaster from "../../../../../assets/img/icons/icon-master.svg";
import IconQuality from "../../../../../assets/img/icons/icon-quality.svg";

const propTypes = {};

const defaultProps = {};

export default function Slider(props) {
  return (
    <section className={styles.slider}>
      <div className={styles.container}>
        <div className={styles.left}>
          <h1 className={styles.title}>
            Learn how to complete intermediate and advanced level projects
          </h1>
          <p className={styles.text}>
            LiveEdu.tv offers excellent real live projects which help you
            improve your skills in Programming, Game Development, Cryptocurrency
            and much more...
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.listIcon}>
                <img src={IconTechnology} />
              </span>
              Build real products with LiveEdu following best minds
            </li>
            <li className={styles.listItem}>
              <span className={styles.listIcon}>
                <img src={IconMaster} />
              </span>
              Learn any technology from scratch to advanced
            </li>
            <li className={styles.listItem}>
              <span className={styles.listIcon}>
                <img src={IconQuality} />
              </span>
              Become an expert in your category of interest
            </li>
          </ul>
        </div>

        <div className={styles.right}>
          <div className={styles.form}>
            <p className={styles.formTitle}>Free Sign Up</p>
            <SignupForm />
            <p className={styles.formText}>Sign up with social</p>
            <LoginSignupSocial compact={true} />
          </div>
        </div>
      </div>
    </section>
  );
}

Slider.propTypes = propTypes;
Slider.defaultProps = defaultProps;
