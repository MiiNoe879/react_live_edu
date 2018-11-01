import styles from "./schedule.scss";
import React from "react";
import PropTypes from "prop-types";

const propTypes = {};

const defaultProps = {};

const schedule = [
  {
    id: "dkkdKE",
    day: "Mondays",
    time: "10:00 AM"
  },
  {
    id: "eiskSJ",
    day: "Fridays",
    time: "9:00 AM"
  }
];

export default function Schedule(props) {
  const renderScheduleItems = data => {
    return (
      <li className={styles.item} key={data.id}>
        <p className={styles.itemText}>{data.day}</p>
        <p className={styles.itemTitle}>{data.time}</p>
      </li>
    );
  };

  return (
    <div className={styles.schedule}>
      <div className={styles.timezone}>
        <label className={styles.timezoneLabel}>Timezone:</label>
        <select className={styles.timezoneSelect} name="timezone">
          <option value="kyiv">Kyiv/Europe</option>
          <option value="london">London/Europe</option>
        </select>
      </div>

      <ul className={styles.list}>
        <li className={`${styles.item} ${styles.itemHeader}`}>
          <p className={styles.itemText}>Streaming Shedule</p>
          <p className={styles.itemTitle}>Weekly</p>
        </li>

        {schedule.map(item => renderScheduleItems(item))}
      </ul>
    </div>
  );
}

Schedule.propTypes = propTypes;
Schedule.defaultProps = defaultProps;
