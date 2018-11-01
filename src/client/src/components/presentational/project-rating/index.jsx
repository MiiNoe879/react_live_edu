import styles from "./project-rating.scss";
import React from "react";
import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import StarRatingComponent from "react-star-rating-component";
import Reviews from "../project-content/content/reviews";

const propTypes = {
  name: PropTypes.string.isRequired,
  avarage: PropTypes.number.isRequired,
  total: PropTypes.number,
  showAvarage: PropTypes.bool,
  showReviewsCaption: PropTypes.bool,
  iconClassName: PropTypes.string,
  totalClassName: PropTypes.string,
  avarageClassName: PropTypes.string
};

const defaultProps = {
  showAvarage: false,
  showReviewsCaption: false
};

export default function ProjectRating(props) {
  const iconClassNames = props.iconClassName
    ? `${styles.icon} ${props.iconClassName}`
    : styles.icon;
  const totalClassNames = props.totalClassName
    ? `${styles.total} ${props.totalClassName}`
    : styles.total;
  const avarageClassNames = props.avarageClassName
    ? `${styles.avarage} ${props.avarageClassName}`
    : styles.avarage;
  const renderStarIcon = function(index, value) {
    return (
      <span>
        <FontAwesomeIcon
          icon={index <= value ? "star" : ["far", "star"]}
          className={iconClassNames}
        />
      </span>
    );
  };

  const renderStarIconHalf = function() {
    return (
      <span>
        <span style={{ position: "absolute" }}>
          <FontAwesomeIcon icon="star-half" className={iconClassNames} />
        </span>
        <span>
          <FontAwesomeIcon icon={["far", "star"]} className={iconClassNames} />
        </span>
      </span>
    );
  };

  return (
    <div className={styles.projectRating}>
      <StarRatingComponent
        name={props.name}
        editing={false}
        value={props.avarage}
        renderStarIcon={renderStarIcon}
        renderStarIconHalf={renderStarIconHalf}
        className={styles.stars}
      />
      {props.showAvarage && (
        <span className={avarageClassNames}>{props.avarage}</span>
      )}
      {(props.total || props.total === 0) && (
        <span className={totalClassNames}>
          ({props.total}
          {props.showReviewsCaption && ` Reviews`})
        </span>
      )}
    </div>
  );
}

ProjectRating.propTypes = propTypes;
ProjectRating.defaultProps = defaultProps;
