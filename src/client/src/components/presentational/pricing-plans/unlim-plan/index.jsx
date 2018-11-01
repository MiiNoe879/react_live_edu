import styles from "./unlim-plan.scss";
import React from "react";
import PropTypes from "prop-types";
import PlanCard from "components/presentational/pricing-plans/plan-card";
import PlanIcon from "../../../../assets/img/icons/pricing-plan-unlim.svg";

const propTypes = {};

const defaultProps = {};

const planDetails = {
  type: "unlim",
  featured: false,
  title: "Unlimited",
  price: {
    ledu: 1561,
    usd: 24.99
  },
  benefits: {
    title: "Full access to All categories",
    leduBonus: 942,
    list: [
      "Download project files",
      "Watch in full HD",
      "24/7 customer support",
      "Project requests"
    ]
  },
  ctaUrl: "#",
  ctaTitle: "Try Unlimited!"
};

export default function UnlimPlan(props) {
  return <PlanCard details={planDetails} icon={<img src={PlanIcon} />} />;
}

UnlimPlan.propTypes = propTypes;
UnlimPlan.defaultProps = defaultProps;
