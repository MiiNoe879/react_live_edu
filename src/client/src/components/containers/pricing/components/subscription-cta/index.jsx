import styles from "./subscription-cta.scss";
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const propTypes = {
  title: PropTypes.string,
  ctaText: PropTypes.string
};

const defaultProps = {
  title: "Boost your learning performance",
  ctaText: "Buy Subscription"
};

export default function SubscriptionCta(props) {
  return (
    <section className={styles.subscriptionCta}>
      <div className={styles.container}>
        <h2 className={styles.title}>{props.title}</h2>
        <Link to="#" className={styles.cta}>
          {props.ctaText}
        </Link>
      </div>
    </section>
  );
}

SubscriptionCta.propTypes = propTypes;
SubscriptionCta.defaultProps = defaultProps;
