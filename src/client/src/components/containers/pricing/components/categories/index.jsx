import styles from "./categories.scss";
import React from "react";
import PropTypes from "prop-types";
import IconProgramming from "../../../../../assets/img/categories/general-programming.svg";
import IconDesign from "../../../../../assets/img/categories/general-design.svg";
import IconDataScience from "../../../../../assets/img/categories/general-data-science.svg";
import IconAI from "../../../../../assets/img/categories/general-ai.svg";
import IconArVr from "../../../../../assets/img/categories/general-ar-vr.svg";
import IconCybersecurity from "../../../../../assets/img/categories/general-cybersecurity.svg";
import IconCryptocurrency from "../../../../../assets/img/categories/general-cryptocurrency.svg";
import IconGameDevelopment from "../../../../../assets/img/categories/general-game-development.svg";

const propTypes = {};

const defaultProps = {};

const categories = [
  {
    id: "programming",
    name: "Programming",
    projectsCount: 46
  },
  {
    id: "design",
    name: "Design",
    projectsCount: 32
  },
  {
    id: "data-science",
    name: "Data Science",
    projectsCount: 8
  },
  {
    id: "artificial-intelligence",
    name: "Artificial Intelligence",
    projectsCount: 16
  },
  {
    id: "ar-and-vr",
    name: "AR & VR",
    projectsCount: 6
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    projectsCount: 12
  },
  {
    id: "cryptocurrency",
    name: "Cryptocurrency",
    projectsCount: 18
  },
  {
    id: "game-development",
    name: "Game Development",
    projectsCount: 32
  }
];

const icons = [
  {
    id: "programming",
    node: <img src={IconProgramming} key="programming" />
  },
  {
    id: "design",
    node: <img src={IconDesign} key="design" />
  },
  {
    id: "data-science",
    node: <img src={IconDataScience} key="data-science" />
  },
  {
    id: "artificial-intelligence",
    node: <img src={IconAI} key="artificial-intelligence" />
  },
  {
    id: "ar-and-vr",
    node: <img src={IconArVr} key="ar-and-vr" />
  },
  {
    id: "cybersecurity",
    node: <img src={IconCybersecurity} key="cybersecurity" />
  },
  {
    id: "cryptocurrency",
    node: <img src={IconCryptocurrency} key="cryptocurrency" />
  },
  {
    id: "game-development",
    node: <img src={IconGameDevelopment} key="game-development" />
  }
];

export default function Categories(props) {
  const renderCategoryIcon = function(category) {
    return icons.map(icon => {
      if (icon.id === category.id) {
        return icon.node;
      }
    });
  };

  const renderCategory = function(category) {
    return (
      <li className={styles.item} key={category.id}>
        <div className={styles.icon}>{renderCategoryIcon(category)}</div>
        <p className={styles.title}>{category.name}</p>
        <p className={styles.count}>{category.projectsCount}</p>
      </li>
    );
  };

  return (
    <section className={styles.categories}>
      <div className={styles.container}>
        <ul className={styles.list}>
          {categories.map(category => renderCategory(category))}
        </ul>
      </div>
    </section>
  );
}

Categories.propTypes = propTypes;
Categories.defaultProps = defaultProps;
