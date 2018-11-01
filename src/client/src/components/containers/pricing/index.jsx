import styles from "./pricing.scss";
import React from "react";
import PropTypes from "prop-types";
import GuestLayout from "components/containers/app/guest-layout";
import Slider from "./components/slider";
import Categories from "./components/categories";
import Features from "./components/features";
import QualityControl from "./components/quality-control";
import Benefits from "./components/benefits";
import SubscriptionCta from "./components/subscription-cta";
import Reviews from "./components/reviews";
import Projects from "./components/projects";
import Faq from "./components/faq";

const propTypes = {};

const defaultProps = {};

export default function Pricing(props) {
  return (
    <GuestLayout>
      <div className={styles.pricing}>
        <Slider />
        <Categories />
        <Features />
        <QualityControl />
        <Benefits />
        <SubscriptionCta
          title="Boost your learning performance"
          ctaText="Buy Subscription"
        />
        <Reviews />
        <Projects />
        <Faq />
        <SubscriptionCta
          title="Boost your portfolio with the highest rated projects"
          ctaText="Get a Subscription"
        />
      </div>
    </GuestLayout>
  );
}

Pricing.propTypes = propTypes;
Pricing.defaultProps = defaultProps;
