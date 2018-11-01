import styles from "./guides-list.scss";
import React from "react";
import PropTypes from "prop-types";
import GuidesCard from "components/presentational/guides-card";

const propTypes = {
  title: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  guides: PropTypes.arrayOf(PropTypes.object)
};

const defaultProps = {};

export default function GuidesList(props) {
  const renderTitle = function() {
    return (
      <React.Fragment>
        {props.title}{" "}
        {props.tags && (
          <span className={styles.tags}>IN {props.tags.join(", ")}</span>
        )}
      </React.Fragment>
    );
  };

  const renderGuides = function() {
    return props.guides.map(guide => {
      return (
        <li className={styles.item} key={guide.slug}>
          <GuidesCard
            thumbnailUrl={guide.logo_large}
            followers={guide.count_followers}
            projects={guide.count_projects}
            title={guide.name}
          />
        </li>
      );
    });
  };

  return (
    <div className={styles.guidesList}>
      {props.title && <h2 className={styles.title}>{renderTitle()}</h2>}

      {props.guides && <ul className={styles.list}>{renderGuides()}</ul>}
    </div>
  );
}

GuidesList.propTypes = propTypes;
GuidesList.defaultProps = defaultProps;
