import styles from "./breadcrumbs.scss";
import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import withBreadcrumbs from "react-router-breadcrumbs-hoc";

// breadcrumbs can be any type of component or string
const UserBreadcrumb = ({ match }) => <span>{match.params.userId}</span>; // use match param userId to fetch/display user name

// define some custom breadcrumbs for certain routes (optional)
const routes = [
  { path: "/", breadcrumb: null },
  { path: "/live", breadcrumb: null },
  { path: "/projects", breadcrumb: null },
  { path: "/guides", breadcrumb: null },
  { path: "/schedule", breadcrumb: null },
  { path: "/requests", breadcrumb: null }
];

// map & render your breadcrumb components however you want.
// each `breadcrumb` has the props `key`, `location`, and `match` included!
const Breadcrumbs = ({ breadcrumbs }) =>
  breadcrumbs.length > 0 ? (
    <p className={styles.breadcrumbs}>
      {breadcrumbs.map((breadcrumb, index) => (
        <span key={breadcrumb.key}>
          <NavLink to={breadcrumb.props.match.url}>{breadcrumb}</NavLink>
          {index < breadcrumbs.length - 1 && <i> / </i>}
        </span>
      ))}
    </p>
  ) : null;

export default withBreadcrumbs(routes)(Breadcrumbs);
