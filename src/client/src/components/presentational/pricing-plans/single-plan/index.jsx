import styles from "./single-plan.scss";
import React from "react";
import PropTypes from "prop-types";
import PlanCard from "components/presentational/pricing-plans/plan-card";
import PlanIcon from "../../../../assets/img/icons/pricing-plan-single.svg";

const propTypes = {};

const defaultProps = {};

const planDetails = {
  type: "single",
  featured: false,
  title: "Single",
  price: {
    ledu: 951,
    usd: 14.99
  },
  benefits: {
    title: "Full access to 1 category",
    leduBonus: 570,
    list: [
      "Download project files",
      "Watch in full HD",
      "24/7 customer support",
      "Project requests"
    ]
  },
  ctaUrl: "#",
  ctaTitle: "Try Single!"
};

export default function SinglePlan(props) {
  return <PlanCard details={planDetails} icon={<img src={PlanIcon} />} />;
}

SinglePlan.propTypes = propTypes;
SinglePlan.defaultProps = defaultProps;
