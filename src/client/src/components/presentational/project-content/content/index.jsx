import styles from "./content.scss";
import React from "react";
import PropTypes from "prop-types";
import Details from "components/presentational/project-content/content/details";
import Overview from "components/presentational/project-content/content/overview";
import Curriculum from "components/presentational/project-content/content/curriculum";
import Reviews from "components/presentational/project-content/content/reviews";

const propTypes = {};

const defaultProps = {};

export default function Content(props) {
  return (
    <div className={styles.content}>
      <Details />
      <Overview />
      <Curriculum />
      <Reviews />
    </div>
  );
}

Content.propTypes = propTypes;
Content.defaultProps = defaultProps;
