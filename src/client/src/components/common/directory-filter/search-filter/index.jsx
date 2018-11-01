import styles from "./search-filter.scss";
import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

const propTypes = {};

const defaultProps = {};

@withRouter
export default class SearchFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterValue: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.setState({ filterValue: "" });
    }
  }

  handleChange(event) {
    this.props.onChange(event.target.value);
    this.setState({ filterValue: event.target.value });
  }

  render() {
    return (
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search for a subcategory"
          className={styles.input}
          value={this.state.filterValue}
          onChange={event => this.handleChange(event)}
        />
        <button className={styles.button}>
          <FontAwesomeIcon icon="search" className={styles.icon} />
        </button>
      </div>
    );
  }
}

SearchFilter.propTypes = propTypes;
SearchFilter.defaultProps = defaultProps;
