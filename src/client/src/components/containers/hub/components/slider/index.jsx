import styles from "./slider.scss";
import React from "react";
import PropTypes from "prop-types";

const propTypes = {};

const defaultProps = {};

export default function Slider(props) {
  return (
    <section className={styles.slider}>
      <div className={styles.container}>
        <h1>Learn how to complete intermediate and advanced level projects</h1>
      </div>
    </section>
  );
}

Slider.propTypes = propTypes;
Slider.defaultProps = defaultProps;
