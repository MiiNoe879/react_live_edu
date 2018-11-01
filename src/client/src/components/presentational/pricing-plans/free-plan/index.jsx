import styles from "./free-plan.scss";
import React from "react";
import PropTypes from "prop-types";
import PlanCard from "components/presentational/pricing-plans/plan-card";

const propTypes = {};

const defaultProps = {};

const planDetails = {
  type: "free",
  featured: false,
  title: "Free",
  benefits: {
    title: "Limited access",
    list: ["Watch in HD", "Create projects"]
  },
  ctaUrl: "#",
  ctaTitle: "Go Free"
};

export default function FreePlan(props) {
  return <PlanCard details={planDetails} />;
}

FreePlan.propTypes = propTypes;
FreePlan.defaultProps = defaultProps;
