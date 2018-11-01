import styles from "./pricing-plans.scss";
import React from "react";
import PropTypes from "prop-types";
import AnnualSwitcher from "./annual-switcher";
import FreePlan from "./free-plan";
import SinglePlan from "./single-plan";
import TriplePlan from "./triple-plan";
import UnlimPlan from "./unlim-plan";

const propTypes = {};

const defaultProps = {};

export default function PricingPlans(props) {
  return (
    <div className={styles.pricingPlans}>
      <AnnualSwitcher />

      <div className={styles.plans}>
        <FreePlan />
        <SinglePlan />
        <TriplePlan />
        <UnlimPlan />
      </div>
    </div>
  );
}

PricingPlans.propTypes = propTypes;
PricingPlans.defaultProps = defaultProps;
