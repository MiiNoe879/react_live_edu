import styles from "./projects.scss";
import React from "react";
import PropTypes from "prop-types";
import ProjectCard from "components/presentational/project-card";

const propTypes = {};

const defaultProps = {};

const projects = [
  {
    id: "iJd23j",
    featured: false,
    live: false,
    qa: false,
    projectUrl: "/james_spoke/iJd23j-building-a-video-game-on-unity-engine",
    thumbnailUrl: "http://via.placeholder.com/222x125",
    rating: { avarage: 3.5, total: 891 },
    followers: 102,
    title: "Building a Video Game on Unity Engine",
    creator: "James_spoke"
  },
  {
    id: "ehdj3j",
    featured: false,
    live: false,
    qa: false,
    projectUrl: "/james_spoke/ehdj3j-building-a-video-game-on-unity-engine",
    thumbnailUrl: "http://via.placeholder.com/222x125",
    rating: { avarage: 3.5, total: 891 },
    followers: 102,
    title: "Building a Video Game on Unity Engine",
    creator: "James_spoke"
  },
  {
    id: "i3d23j",
    featured: false,
    live: false,
    qa: false,
    projectUrl: "/james_spoke/iJd23j-building-a-video-game-on-unity-engine",
    thumbnailUrl: "http://via.placeholder.com/222x125",
    rating: { avarage: 3.5, total: 891 },
    followers: 102,
    title: "Building a Video Game on Unity Engine",
    creator: "James_spoke"
  },
  {
    id: "ehdf3j",
    featured: false,
    live: false,
    qa: false,
    projectUrl: "/james_spoke/ehdj3j-building-a-video-game-on-unity-engine",
    thumbnailUrl: "http://via.placeholder.com/222x125",
    rating: { avarage: 3.5, total: 891 },
    followers: 102,
    title: "Building a Video Game on Unity Engine",
    creator: "James_spoke"
  },
  {
    id: "eydj3j",
    featured: false,
    live: false,
    qa: false,
    projectUrl: "/james_spoke/ehdj3j-building-a-video-game-on-unity-engine",
    thumbnailUrl: "http://via.placeholder.com/222x125",
    rating: { avarage: 3.5, total: 891 },
    followers: 102,
    title: "Building a Video Game on Unity Engine",
    creator: "James_spoke"
  }
];

export default function Projects(props) {
  const renderProject = function(project) {
    return (
      <li className={styles.item} key={project.id}>
        <ProjectCard
          id={project.id}
          projectUrl={project.projectUrl}
          thumbnailUrl={project.thumbnailUrl}
          rating={project.rating}
          followers={project.followers}
          title={project.title}
          creator={project.creator}
        />
      </li>
    );
  };

  const renderProjects = function(projects) {
    return projects.map(project => renderProject(project));
  };

  return (
    <div className={styles.projects}>
      <div className={styles.container}>
        <h2 className={styles.title}>Top projects done on LiveEdu</h2>
        <ul className={styles.list}>{renderProjects(projects)}</ul>
      </div>
    </div>
  );
}

Projects.propTypes = propTypes;
Projects.defaultProps = defaultProps;
