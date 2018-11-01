import styles from "./schedule-card.scss";
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import classNames from "classnames";
import {
  get12HoursTimeFromTimestamp,
  getAmPmSuffixFromTimestamp
} from "utils/helpers";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import TopicIcon from "components/common/topic-icon";

const propTypes = {
  id: PropTypes.number.isRequired,
  live: PropTypes.bool,
  qa: PropTypes.bool,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  projectUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  creator: PropTypes.string.isRequired,
  topic: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired,
  following: PropTypes.bool.isRequired,
  isUserProjectCreator: PropTypes.bool,
  user: PropTypes.object,
  thumbUrl: PropTypes.string
};

const defaultProps = {
  featured: false,
  live: false,
  qa: false
};

export default function ScheduleCard(props) {
  const isAbleToFollow = props.user && !props.isUserProjectCreator;
  const cardClassNames = classNames({
    [styles.card]: true,
    [styles.cardLive]: props.live,
    [styles.cardQA]: props.qa
  });

  const buttonClassNames = classNames({
    [styles.cta]: true,
    [styles.ghost]: !props.following,
    [styles.full]: props.following
  });

  const handleFollow = () => {
    console.log("Follow button clicked");
  };

  const handleUnfollow = () => {
    console.log("Unfollow button clicked");
  };

  return (
    <div className={cardClassNames}>
      <div className={styles.time}>
        {get12HoursTimeFromTimestamp(`${props.date} ${props.time}`)}
        <span className={styles.timeSuffix}>
          {getAmPmSuffixFromTimestamp(`${props.date} ${props.time}`)}
        </span>
      </div>

      <Link to={props.projectUrl} className={styles.thumb}>
        <img src={props.thumbUrl} alt="Thumbnail" />
      </Link>

      <div className={styles.desc}>
        <Link to={props.projectUrl} className={styles.title}>
          {props.title}
        </Link>

        <p className={styles.username}>
          <span className={styles.with}>with</span> {props.creator}
        </p>

        <p className={styles.icons}>
          <TopicIcon
            small={true}
            topic={props.topic.slug}
            title={props.topic.name}
            className={styles.topic}
          />
          <img
            src={props.category.logo}
            alt={props.category.name}
            className={styles.category}
            title={props.category.name}
          />
        </p>
      </div>

      {isAbleToFollow &&
        (props.following ? (
          <button className={buttonClassNames} onClick={handleUnfollow}>
            Following <FontAwesomeIcon icon="check" className={styles.icon} />
          </button>
        ) : (
          <button className={buttonClassNames} onClick={handleFollow}>
            Follow
          </button>
        ))}
    </div>
  );
}

ScheduleCard.propTypes = propTypes;
ScheduleCard.defaultProps = defaultProps;
