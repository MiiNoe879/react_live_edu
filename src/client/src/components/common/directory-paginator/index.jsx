import styles from "./directory-paginator.scss";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import { Link } from "react-router-dom";
import { Range, Seq } from "immutable";
import { MAX_PROJECTS_PER_PAGE, MAX_VISIBLE_PAGES } from "store/app/constants";
import { getFiltersFromUrl } from "utils/helpers";

const propTypes = {
  countItems: PropTypes.number.isRequired,
  baseUrl: PropTypes.string.isRequired,
  location: PropTypes.object,
  match: PropTypes.object,
  perPage: PropTypes.number,
  visiblePages: PropTypes.number
};

const defaultProps = {
  perPage: MAX_PROJECTS_PER_PAGE,
  visiblePages: MAX_VISIBLE_PAGES
};

@withRouter
@connect((state, props) => ({
  filters: getFiltersFromUrl(props.match, props.location)
}))
export default class DirectoryPaginator extends React.Component {
  buildUrl(pageNumber) {
    const { filters, baseUrl } = this.props;
    let url = `${baseUrl}/`;

    if (filters.topic && filters.topic !== "all") {
      url += filters.topic + "/";
      if (filters.category && filters.category !== "all") {
        url += filters.category + "/";
        if (pageNumber && pageNumber !== 1) {
          url += pageNumber;
        }
      } else if (pageNumber && pageNumber !== 1) {
        url += "all/" + pageNumber;
      }
    } else if (filters.category && filters.category !== "all") {
      url += "all/" + filters.category + "/";
      if (pageNumber && pageNumber !== 1) {
        url += pageNumber;
      }
    } else if (pageNumber && pageNumber !== 1) {
      url += "all/all/" + pageNumber;
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
    const qs = queryString.stringify(query);
    if (qs !== "") {
      url += "?" + qs;
    }

    return url;
  }

  render() {
    const { filters, perPage, countItems, visiblePages } = this.props;
    const countPages = Math.ceil(countItems / perPage);
    const current = /^(\d+)$/.exec(filters.page)
      ? parseInt(filters.page, 10)
      : 1;

    let pages;
    if (countPages > visiblePages) {
      let a = current - Math.floor(visiblePages / 2);
      let b = a + (visiblePages - 1);

      if (a < 1) {
        const d = 1 - a;
        a += d;
        b += d;
      } else if (b > countPages) {
        const d = b - countPages;
        b -= d;
        a -= d;
      }
      a = Math.max(0, a);
      b = Math.min(countPages, b);

      pages = Range(a, b + 1);
      if (a > 1) {
        pages = Seq([1, null]).concat(pages);
      }
      if (b < countPages) {
        pages = pages.concat(Seq([null, countPages]));
      }
    } else {
      pages = Range(1, countPages + 1);
    }

    const prev = current > 1 ? current - 1 : null;
    const next = current < countPages ? current + 1 : null;

    if (countPages <= 1 || current > countPages) {
      return null;
    }

    return (
      <div className={styles.directoryPaginator}>
        {prev ? (
          <Link
            to={this.buildUrl(prev)}
            key="prev"
            rel="page"
            className={styles.prev}
          >
            <span className={styles.arrow}>«</span>
            Previous
          </Link>
        ) : (
          <p className={`${styles.disabled} ${styles.prev}`}>
            <span className={styles.arrow}>«</span>
            Previous
          </p>
        )}
        {pages.map((p, idx) => {
          if (p === null) {
            return (
              <span key={`skip-${idx}`} className={styles.separator}>
                &hellip;
              </span>
            );
          }

          if (p === current) {
            return (
              <span key={p} className={`${styles.link} ${styles.current}`}>
                {p}
              </span>
            );
          }

          return (
            <Link
              to={this.buildUrl(p)}
              key={p}
              rel="page"
              className={styles.link}
            >
              {p}
            </Link>
          );
        })}
        {next ? (
          <Link
            to={this.buildUrl(next)}
            key="next"
            rel="page"
            className={styles.next}
          >
            Next
            <span className={styles.arrow}>»</span>
          </Link>
        ) : (
          <p className={`${styles.disabled} ${styles.next}`}>
            Next
            <span className={styles.arrow}>»</span>
          </p>
        )}
      </div>
    );
  }
}

DirectoryPaginator.propTypes = propTypes;
DirectoryPaginator.defaultProps = defaultProps;
