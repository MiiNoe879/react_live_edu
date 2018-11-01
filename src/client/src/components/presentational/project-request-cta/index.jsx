import styles from "./project-request-cta.scss";
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import RequestsModal from "components/presentational/requests-modal";

const propTypes = {};

const defaultProps = {};

export default function ProjectRequestCta(props) {
  return (
    <div className={styles.projectRequest}>
      <p className={styles.title}>Can’t find what you need?</p>
      <p className={styles.text}>
        Request your own project and the streamers will make it for you.
      </p>

      <RequestsModal ctaClassName={styles.cta} />

      <Link to="/requests" className={styles.link}>
        View existing project requests
      </Link>
    </div>
  );
}

ProjectRequestCta.propTypes = propTypes;
ProjectRequestCta.defaultProps = defaultProps;
