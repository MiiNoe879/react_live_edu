import styles from "./search-bar.scss";
import React from "react";
import PropTypes from "prop-types";
import SearchIcon from "../../../../assets/img/icons/search.svg";

const propTypes = {};

const defaultProps = {};

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Find livestreams, projects, people"
          className={styles.input}
        />
        <button className={styles.button}>
          <img src={SearchIcon} className={styles.icon} />
        </button>
      </div>
    );
  }
}

SearchBar.propTypes = propTypes;
SearchBar.defaultProps = defaultProps;
