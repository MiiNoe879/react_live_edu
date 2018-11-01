import styles from "./recommended-projects.scss";
import React from "react";
import PropTypes from "prop-types";
import ProjectCard from "components/presentational/project-card";

const propTypes = {};

const defaultProps = {};

const recommendedProjects = [
  {
    id: "iJdj3j",
    featured: true,
    live: false,
    qa: false,
    projectUrl: "/james_spoke/iJdj3j-building-a-video-game-on-unity-engine",
    thumbnailUrl: "http://via.placeholder.com/682x382",
    rating: { avarage: 3.5, total: 891 },
    followers: 102,
    title: "Building a Video Game on Unity Engine",
    creator: "James_spoke"
  },
  {
    id: "eJdj3j",
    featured: false,
    live: false,
    qa: false,
    projectUrl: "/james_spoke/eJdj3j-building-a-video-game-on-unity-engine",
    thumbnailUrl: "http://via.placeholder.com/222x125",
    rating: { avarage: 3.5, total: 891 },
    followers: 102,
    title: "Building a Video Game on Unity Engine",
    creator: "James_spoke"
  }
];

export default function RecommendedProjects(props) {
  const renderProjects = function(projects) {
    return projects.map(project => {
      return (
        <li className={styles.item} key={project.id}>
          <ProjectCard
            id={project.id}
            featured={false}
            live={project.live}
            qa={project.qa}
            projectUrl={project.projectUrl}
            thumbnailUrl={project.thumbnailUrl}
            rating={project.rating}
            followers={project.followers}
            title={project.title}
            creator={project.creator}
            modClassName={styles.itemCard}
          />
        </li>
      );
    });
  };

  return (
    <div className={styles.projects}>
      <p className={styles.title}>Recommended Projects</p>
      <ul className={styles.list}>{renderProjects(recommendedProjects)}</ul>
    </div>
  );
}
