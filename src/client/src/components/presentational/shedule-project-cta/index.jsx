import styles from "./schedule-project-cta.scss";
import React from "react";
import PropTypes from "prop-types";
import ScheduleModal from "components/presentational/schedule-modal";

const propTypes = {};

const defaultProps = {};

export default function ScheduleProjectCta(props) {
  return (
    <div className={styles.scheduleProjectCta}>
      <p className={styles.title}>Schedule your project</p>
      <p className={styles.text}>
        Cover larger audience, increase your project views, keep your friends
        updated by adding your project time and date to schedule.
      </p>

      <ScheduleModal ctaClassName={styles.cta} />
    </div>
  );
}

ScheduleProjectCta.propTypes = propTypes;
ScheduleProjectCta.defaultProps = defaultProps;
