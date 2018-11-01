import styles from "./features.scss";
import React from "react";
import PropTypes from "prop-types";
import Feature from "./feature";
import FeaturesList from "./features-list";
import ImageFeature01 from "../../../../../assets/img/pricing/feature-01.jpg";
import ImageFeature02 from "../../../../../assets/img/pricing/feature-02.jpg";
import ImageFeature03 from "../../../../../assets/img/pricing/feature-03.jpg";

const propTypes = {};

const defaultProps = {};

export default function Features(props) {
  return (
    <section className={styles.features}>
      <div className={styles.container}>
        <Feature
          title="Get high-quality educational content with a LiveEdu subscription"
          text="Watch and access professional live streams and on-demand project tutorials. Improve your job skills. Have fun while learning new things."
          imageUrl={ImageFeature01}
        />

        <FeaturesList />

        <Feature
          title="Develop live projects mentored by real professionals"
          text="Our unique platform connects learners with project creators from all over the world. Our certified quality controllers ensure that every project meets the highest standards."
          imageUrl={ImageFeature02}
          reversed={true}
        />

        <Feature
          title="Interact directly with project creators in Q&amp;A sessions"
          text="After each learning session, our project creators are making Q&amp;A live stream sessions where you can ask any questions related to the last video and interact with the project creator directly."
          imageUrl={ImageFeature03}
        />
      </div>
    </section>
  );
}

Features.propTypes = propTypes;
Features.defaultProps = defaultProps;
