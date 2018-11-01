import styles from "./project.scss";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MainLayout from "components/containers/app/main-layout";
import ProjectWatch from "components/presentational/project-watch";
import ProjectContent from "components/presentational/project-content";

const propTypes = {};

const defaultProps = {};

@connect(
  (state, props) => ({
    // socialApps: state.auth.get("socialApps")
  }),
  dispatch => ({
    // getSocialAppsAction: () => dispatch(getSocialApps())
  })
)
export default class Project extends React.Component {
  componentDidMount() {
    // Fetch project details
    // str.split("-", 1);
  }

  componentWillUnmount() {
    // Remove previosly fetched project from store
  }

  render() {
    const requestedProjectUser = this.props.match.params.user;
    const requestedProjectProject = this.props.match.params.project;

    return (
      <MainLayout title="Projects">
        <div className={styles.project}>
          <ProjectWatch />
          <ProjectContent />
        </div>
      </MainLayout>
    );
  }
}

Project.propTypes = propTypes;
Project.defaultProps = defaultProps;
