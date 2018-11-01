import styles from "./sort-filter.scss";
import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import queryString from "query-string";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { push } from "connected-react-router";
import { getFiltersFromUrl } from "utils/helpers";
import {
  ORDERING_FILTER_OPTIONS,
  REQUESTS_ORDERING_FILTER_OPTIONS,
  DIFFICULTY_FILTER_OPTIONS,
  LANGUAGE_FILTER_OPTIONS
} from "store/app/constants";

const propTypes = {};

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
export default class SortFilter extends React.Component {
  buildUrl(what, value) {
    const { filters, baseUrl } = this.props;
    let url = `${baseUrl}/`;

    if (filters.topic) {
      url += `${filters.topic}/`;
    }
    if (filters.category) {
      url += `${filters.category}/`;
    }

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

    if (what === "ordering") {
      query.ordering = value;
    }
    if (what === "difficulty") {
      query.difficulty = value;
    }
    if (what === "language") {
      query.language = value;
    }

    const qs = queryString.stringify(query);
    if (qs !== "") {
      url += "?" + qs;
    }

    return url;
  }

  onChange(what, value) {
    const url = this.buildUrl(what, value ? value.route : undefined);
    return this.props.navigate(url);
  }

  render() {
    const { baseUrl, filters } = this.props;

    const shouldShowOrderingFilter = baseUrl !== "/schedule";

    const optionsOrdering =
      baseUrl === "/requests"
        ? REQUESTS_ORDERING_FILTER_OPTIONS
        : ORDERING_FILTER_OPTIONS;

    const optionsDifficulty = DIFFICULTY_FILTER_OPTIONS;

    const optionsLanguage = LANGUAGE_FILTER_OPTIONS;

    const customStyles = {
      control: base => ({
        ...base,
        backgroundColor: "#fff",
        border: "1px solid #f3f3f3",
        height: "32px",
        minHeight: "32px",
        borderRadius: "2px"
      })
    };

    const valueOrdering = filters.ordering
      ? optionsOrdering.filter(option => option.route === filters.ordering)[0]
      : baseUrl === "/requests"
        ? optionsOrdering[0]
        : null;

    const valueDifficulty = filters.difficulty
      ? optionsDifficulty.filter(
          option => option.route === filters.difficulty
        )[0]
      : null;

    const valueLanguage = filters.language
      ? optionsLanguage.filter(option => option.route === filters.language)[0]
      : null;

    return (
      <div className={styles.sort}>
        {shouldShowOrderingFilter && (
          <Select
            options={optionsOrdering}
            isClearable={true}
            className={styles.select}
            styles={customStyles}
            value={valueOrdering}
            placeholder="Sort"
            onChange={value => this.onChange("ordering", value)}
          />
        )}
        <Select
          options={optionsDifficulty}
          isClearable={true}
          className={styles.select}
          styles={customStyles}
          value={valueDifficulty}
          placeholder="Difficulty"
          onChange={value => this.onChange("difficulty", value)}
        />
        <Select
          options={optionsLanguage}
          isClearable={true}
          className={styles.select}
          styles={customStyles}
          value={valueLanguage}
          placeholder="Language"
          onChange={value => this.onChange("language", value)}
        />
      </div>
    );
  }
}

SortFilter.propTypes = propTypes;
SortFilter.defaultProps = defaultProps;
