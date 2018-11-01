import styles from "./directory-filter.scss";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchTopicsHierarchy } from "store/app/actions";
import TopicsFilter from "./topics-filter";
import CategoryFilter from "./category-filter";
import SortFilter from "./sort-filter";
import SearchFilter from "./search-filter";

const propTypes = {
  baseUrl: PropTypes.string.isRequired
};

const defaultProps = {};

@connect(
  (state, props) => ({
    topicsHierarchy: state.app.get("topicsHierarchy")
  }),
  dispatch => ({
    fetchTopicsHierarchyAction: () => dispatch(fetchTopicsHierarchy())
  }),
  null,
  { pure: false }
)
export default class DirectoryFilter extends React.Component {
  componentDidMount() {
    if (!this.props.topicsHierarchy) {
      this.props.fetchTopicsHierarchyAction();
    }
  }

  render() {
    const { topicsHierarchy, baseUrl, onSearchFilterChange } = this.props;

    return (
      <div className={styles.filter}>
        <div className={styles.container}>
          <div className={styles.top}>
            {topicsHierarchy && (
              <TopicsFilter topics={topicsHierarchy} baseUrl={baseUrl} />
            )}
          </div>
          <div className={styles.bottom}>
            {baseUrl === "/guides" ? (
              <SearchFilter onChange={onSearchFilterChange} />
            ) : (
              <React.Fragment>
                {topicsHierarchy && (
                  <CategoryFilter topics={topicsHierarchy} baseUrl={baseUrl} />
                )}
                <SortFilter baseUrl={baseUrl} />
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }
}

DirectoryFilter.propTypes = propTypes;
DirectoryFilter.defaultProps = defaultProps;
