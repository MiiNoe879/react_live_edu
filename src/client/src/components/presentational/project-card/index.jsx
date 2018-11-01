import styles from "./project-card.scss";
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { getFormatedTimeFromSeconds } from "utils/helpers";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import ProjectRating from "components/presentational/project-rating";

const propTypes = {
  id: PropTypes.string.isRequired,
  featured: PropTypes.bool,
  live: PropTypes.bool,
  qa: PropTypes.bool,
  projectUrl: PropTypes.string.isRequired,
  thumbnailUrl: PropTypes.string.isRequired,
  rating: PropTypes.shape({
    avarage: PropTypes.number,
    total: PropTypes.number
  }).isRequired,
  views: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
};

const defaultProps = {
  featured: false,
  live: false,
  qa: false
};

export default function ProjectCard(props) {
  const cardClassNames = classNames({
    [styles.card]: true,
    [styles.cardFeatured]: props.featured
  });

  const renderCardDescription = function() {
    return (
      <React.Fragment>
        <div className={styles.counts}>
          <ProjectRating
            avarage={props.rating.avarage}
            total={props.rating.total}
            name={props.id}
            iconClassName={styles.countsRatingIcon}
            totalClassName={styles.countsRatingTotal}
          />

          <div className={styles.followers}>
            <FontAwesomeIcon icon="user" className={styles.icon} />
            <span className={styles.value}>{props.views}</span>
          </div>
        </div>
      </React.Fragment>
    );
  };

  return (
    <Link to={props.projectUrl} className={cardClassNames}>
      {props.live && (
        <span className={styles.liveBadge}>
          Live
          <span className={styles.dot} />
        </span>
      )}
      {props.startsIn &&
        props.upcoming && (
          <span className={styles.upcomingBadge}>
            Starts in
            <span className={styles.upcomingTime}>
              {getFormatedTimeFromSeconds(props.startsIn)}
            </span>
          </span>
        )}
      <img
        src={props.thumbnailUrl}
        className={styles.thumb}
        alt="Project thumbnail"
        width={222}
        height={126}
      />
      <div className={styles.desc}>{renderCardDescription()}</div>
      <p className={styles.title}>{props.title}</p>
      <p className={styles.username}>
        <span className={styles.with}>with</span> {props.username}
      </p>
    </Link>
  );
}

ProjectCard.propTypes = propTypes;
ProjectCard.defaultProps = defaultProps;
