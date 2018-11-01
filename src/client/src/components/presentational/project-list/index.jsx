import styles from "./project-list.scss";
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import ProjectCard from "components/presentational/project-card";

const propTypes = {};

const defaultProps = {};

export default function ProjectList(props) {
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
    return props.projects.map((project, index) => {
      const isFeatured =
        props.showFeatured && project.get("is_featured") && index === 0;
      const isUpcoming = props.showUpcoming && project.get("is_upcoming");
      const itemClassNames = classNames({
        [styles.item]: true,
        [styles.itemFeatured]: isFeatured,
        [styles.itemUpcoming]: isUpcoming
      });
      return (
        <li className={itemClassNames} key={project.get("id")}>
          <ProjectCard
            id={project.get("id")}
            featured={isFeatured}
            upcoming={isUpcoming}
            startsIn={project.get("starts_in")}
            live={project.get("is_live")}
            qa={project.get("qa")}
            projectUrl={`/${project.get("user").slug}/${project.get(
              "id"
            )}-${project.get("slug")}`}
            thumbnailUrl={project.get("thumbnail_url")}
            rating={{
              avarage: project.get("avg_score"),
              total: project.get("num_ratings")
            }}
            views={project.get("views_overall")}
            title={project.get("title")}
            username={project.get("user").username}
          />
        </li>
      );
    });
  };

  return (
    <div className={styles.projectList}>
      {props.title && <h2 className={styles.title}>{renderTitle()}</h2>}

      {props.projects && <ul className={styles.list}>{renderProjects()}</ul>}
    </div>
  );
}

ProjectList.propTypes = propTypes;
ProjectList.defaultProps = defaultProps;
