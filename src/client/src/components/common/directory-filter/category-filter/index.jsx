import styles from "./category-filter.scss";
import React from "react";
import PropTypes from "prop-types";
import Select, { createFilter } from "react-select";
import queryString from "query-string";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { push } from "connected-react-router";
import { getFiltersFromUrl } from "utils/helpers";

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
export default class CategoryFilter extends React.Component {
  buildUrl(category) {
    const { filters, baseUrl } = this.props;
    let url = `${baseUrl}/`;

    if (filters.topic && filters.topic !== "all") {
      url += filters.topic + "/";
      if (category) {
        url += category + "/";
      }
    } else if (category) {
      url += "all/" + category + "/";
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

    const qs = queryString.stringify(query);

    if (qs !== "") {
      url += "?" + qs;
    }

    return url;
  }

  onChange(category) {
    const url = this.buildUrl(category ? category.value : undefined);
    return this.props.navigate(url);
  }

  render() {
    const { topics, filters } = this.props;

    const options =
      filters.topic && filters.topic !== "all"
        ? topics
            .filter(topic => {
              return topic.slug === filters.topic;
            })[0]
            .category_groups[0].categories.map(category => {
              return {
                value: category.slug,
                label: category.name
              };
            })
        : Array.prototype.concat(
            ...topics.map(topic => {
              return topic.category_groups[0].categories.map(category => {
                return {
                  value: category.slug,
                  label: category.name
                };
              });
            })
          );

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

    const value =
      filters.category && filters.category !== "all"
        ? {
            value: filters.category,
            label: Array.prototype
              .concat(
                ...topics.map(topic => {
                  return topic.category_groups[0].categories.map(category => {
                    return {
                      value: category.slug,
                      label: category.name
                    };
                  });
                })
              )
              .filter(category => category.value === filters.category)[0].label
          }
        : null;

    return (
      <div className={styles.categories}>
        <Select
          options={options}
          isClearable={true}
          className={styles.select}
          placeholder="Choose a category"
          styles={customStyles}
          value={value}
          onChange={category => this.onChange(category)}
        />
      </div>
    );
  }
}

CategoryFilter.propTypes = propTypes;
CategoryFilter.defaultProps = defaultProps;
