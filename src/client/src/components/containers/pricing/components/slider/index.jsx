import styles from "./slider.scss";
import React from "react";
import PropTypes from "prop-types";
import PricingPlans from "components/presentational/pricing-plans";

const propTypes = {};

const defaultProps = {};

export default function Slider(props) {
  return (
    <section className={styles.slider}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          Get full access to high-quality projects on a wide range of categories
        </h2>
        <p className={styles.text}>
          Buy Single, Triple or Unlimited packages to get full access to live
          streams and project videos
        </p>

        <PricingPlans />
      </div>
    </section>
  );
}

Slider.propTypes = propTypes;
Slider.defaultProps = defaultProps;
