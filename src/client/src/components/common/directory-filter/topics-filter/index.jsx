import styles from "./topics-filter.scss";
import React from "react";
import PropTypes from "prop-types";
import queryString from "query-string";
import classNames from "classnames";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import { push } from "connected-react-router";
import { getFiltersFromUrl } from "utils/helpers";
import TopicIcon from "components/common/topic-icon";

const propTypes = {
  baseUrl: PropTypes.string.isRequired,
  topics: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired
};

const defaultProps = {};

@withRouter
@connect(
  (state, props) => ({
    filters: getFiltersFromUrl(props.match, props.location)
  }),
  dispatch => ({
    navigate: url => dispatch(push(url))
  })
)
export default class TopicsFilter extends React.Component {
  buildUrl(value) {
    const { filters } = this.props;
    let url =
      value === "all"
        ? `${this.props.baseUrl}`
        : `${this.props.baseUrl}/${value}`;
    let query = {};

    if (filters.language) {
      query.language = filters.language;
    }
    if (filters.difficulty) {
      query.difficulty = filters.difficulty;
    }
    if (filters.ordering) {
      query.ordering = filters.ordering;
    }
    if (filters.search) {
      query.q = filters.search;
    }
    if (filters.date) {
      query.date = filters.date;
    }

    const qs = queryString.stringify(query);

    if (qs !== "") {
      url += "/?" + qs;
    }

    return url;
  }

  handleClick(topic) {
    const url = this.buildUrl(topic);
    return this.props.navigate(url);
  }

  getButtonClassNames(topic) {
    const { filters } = this.props;

    return classNames({
      [styles.button]: true,
      [styles.active]:
        filters.topic === topic || (!filters.topic && topic === "all")
    });
  }

  render() {
    return (
      <ul className={styles.topics}>
        <li className={`${styles.item} ${styles.itemAll}`}>
          <button
            onClick={() => this.handleClick("all")}
            className={this.getButtonClassNames("all")}
          >
            All
          </button>
        </li>
        {this.props.topics.map(topic => (
          <li className={styles.item} key={topic.slug}>
            <button
              onClick={() => this.handleClick(topic.slug)}
              className={this.getButtonClassNames(topic.slug)}
            >
              <TopicIcon topic={topic.slug} small={true} />
              {topic.name}
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

TopicsFilter.propTypes = propTypes;
TopicsFilter.defaultProps = defaultProps;
