import styles from "./schedule-list.scss";
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { getFormatedDateFromDate } from "utils/helpers";
import ScheduleCard from "components/presentational/schedule-card";

const propTypes = {};

const defaultProps = {};

export default function ScheduleList(props) {
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

  const renderProjects = function() {
    const itemClassNames = classNames({
      [styles.item]: true,
      [styles.itemLive]: props.live,
      [styles.itemQA]: props.qa
    });

    return props.projects.map(project => {
      return (
        <li className={itemClassNames} key={project.get("id")}>
          <ScheduleCard
            id={project.get("id")}
            live={project.get("live")}
            qa={project.get("qa")}
            date={project.get("date")}
            time={project.get("time")}
            projectUrl={`/${project.get("project").user.slug}/${
              project.get("project").id
            }-${project.get("project").slug}`}
            title={project.get("project").title}
            creator={project.get("project").user.username}
            topic={project.get("project").category.topic}
            category={project.get("project").category}
            following={project.get("is_following")}
            isUserProjectCreator={props.isUserProjectCreator}
            user={props.user}
            thumbUrl={project.get("project").thumbnail_url}
          />
        </li>
      );
    });
  };

  return (
    <div className={styles.scheduleList}>
      <h2 className={styles.title}>{getFormatedDateFromDate(props.date)}</h2>
      <ul className={styles.list}>{renderProjects()}</ul>
    </div>
  );
}

ScheduleList.propTypes = propTypes;
ScheduleList.defaultProps = defaultProps;
