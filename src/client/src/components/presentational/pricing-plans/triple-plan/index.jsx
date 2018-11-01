import styles from "./triple-plan.scss";
import React from "react";
import PropTypes from "prop-types";
import PlanCard from "components/presentational/pricing-plans/plan-card";
import PlanIcon from "../../../../assets/img/icons/pricing-plan-triple.svg";

const propTypes = {};

const defaultProps = {};

const planDetails = {
  type: "triple",
  featured: true,
  title: "Triple",
  price: {
    ledu: 1220,
    usd: 19.99
  },
  benefits: {
    title: "Full access to 3 category",
    leduBonus: 732,
    list: [
      "Download project files",
      "Watch in full HD",
      "24/7 customer support",
      "Project requests"
    ]
  },
  ctaUrl: "#",
  ctaTitle: "Try Triple!"
};

export default function TriplePlan(props) {
  return <PlanCard details={planDetails} icon={<img src={PlanIcon} />} />;
}

TriplePlan.propTypes = propTypes;
TriplePlan.defaultProps = defaultProps;
