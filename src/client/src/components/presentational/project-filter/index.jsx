import styles from "./project-filter.scss";
import React from "react";
import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

const propTypes = {};

const defaultProps = {};

export default class ProjectFilter extends React.Component {
  renderCategoriesList() {
    return (
      <React.Fragment>
        <li className={styles.item}>
          <button className={styles.dropdownButton}>
            <FontAwesomeIcon icon="code" className={styles.icon} />Programming
          </button>
        </li>
        <li className={styles.item}>
          <button className={styles.dropdownButton}>
            <FontAwesomeIcon icon="gamepad" className={styles.icon} />Game
            Development
          </button>
        </li>
        <li className={styles.item}>
          <button className={styles.dropdownButton}>
            <FontAwesomeIcon icon="braille" className={styles.icon} />Data
            scienece
          </button>
        </li>
        <li className={styles.item}>
          <button className={styles.dropdownButton}>
            <FontAwesomeIcon icon={["fab", "modx"]} className={styles.icon} />Design
          </button>
        </li>
        <li className={styles.item}>
          <button className={styles.dropdownButton}>
            <FontAwesomeIcon
              icon={["fab", "simplybuilt"]}
              className={styles.icon}
            />VR &amp; AR
          </button>
        </li>
        <li className={styles.item}>
          <button className={styles.dropdownButton}>
            <FontAwesomeIcon
              icon={["fab", "connectdevelop"]}
              className={styles.icon}
            />Artificial intelligence
          </button>
        </li>
        <li className={styles.item}>
          <button className={styles.dropdownButton}>
            <FontAwesomeIcon icon={["fab", "btc"]} className={styles.icon} />Cryptocurrency
          </button>
        </li>
        <li className={styles.item}>
          <button className={styles.dropdownButton}>
            <FontAwesomeIcon icon="lock" className={styles.icon} />Cybersecurity
          </button>
        </li>
      </React.Fragment>
    );
  }

  renderAppliedList() {
    return (
      <React.Fragment>
        <li className={styles.item}>
          C#{" "}
          <button className={styles.removeButton}>
            <FontAwesomeIcon icon="times" className={styles.icon} />
          </button>
        </li>
        <li className={styles.item}>
          PHP{" "}
          <button className={styles.removeButton}>
            <FontAwesomeIcon icon="times" className={styles.icon} />
          </button>
        </li>
        <li className={styles.item}>
          Android{" "}
          <button className={styles.removeButton}>
            <FontAwesomeIcon icon="times" className={styles.icon} />
          </button>
        </li>
      </React.Fragment>
    );
  }

  renderSortFilters() {
    return (
      <React.Fragment>
        <select className={styles.select}>
          <option value="popular">Most popular projects</option>
          <option value="latest">Top rated projects</option>
          <option value="latest">Latest projects</option>
        </select>
        <select className={styles.select}>
          <option value="english">English</option>
          <option value="english">Chinese</option>
        </select>
        <select className={styles.select}>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="Expert">Expert</option>
        </select>
      </React.Fragment>
    );
  }

  render() {
    return (
      <div className={styles.filter}>
        <div className={styles.container}>
          <div className={styles.top}>
            <ul className={styles.categoriesList}>
              {this.renderCategoriesList()}
            </ul>
          </div>
          <div className={styles.bottom}>
            <ul className={styles.appliedList}>{this.renderAppliedList()}</ul>
            <div className={styles.sortFilters}>{this.renderSortFilters()}</div>
          </div>
        </div>
      </div>
    );
  }
}

ProjectFilter.propTypes = propTypes;
ProjectFilter.defaultProps = defaultProps;
