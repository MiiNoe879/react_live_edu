import styles from "./project-directory.scss";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  fetchProjects,
  fetchFeaturedProjects
} from "store/project-directory/actions";
import { IS_USER_CREATOR_LEGACY } from "store/app/constants";
import MainLayout from "components/containers/app/main-layout";
import DirectoryFilter from "components/common/directory-filter";
import ProjectList from "components/presentational/project-list";
import ProjectRequestCta from "components/presentational/project-request-cta";
import DirectoryPaginator from "components/common/directory-paginator";

const propTypes = {};

const defaultProps = {};

@withRouter
@connect(
  (state, props) => ({
    user: state.auth.get("user"),
    projectsList: state.projectDirectory.get("items"),
    projectsCount: state.projectDirectory.get("count"),
    featuredProjectsList: state.projectDirectory.get("itemsFeatured")
  }),
  dispatch => ({
    fetchProjectsAction: (match, location) =>
      dispatch(fetchProjects(match, location)),
    fetchFeaturedProjectsAction: (match, location) =>
      dispatch(fetchFeaturedProjects(match, location))
  })
)
export default class ProjectDirectory extends React.Component {
  componentDidMount() {
    this.props.fetchFeaturedProjectsAction(
      this.props.match,
      this.props.location
    );
    this.props.fetchProjectsAction(this.props.match, this.props.location);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.props.fetchFeaturedProjectsAction(
        this.props.match,
        this.props.location
      );
      this.props.fetchProjectsAction(this.props.match, this.props.location);
    }
  }

  render() {
    const {
      user,
      projectsList,
      projectsCount,
      featuredProjectsList
    } = this.props;
    const baseUrl = "/projects";
    const isUserProjectCreator = user && IS_USER_CREATOR_LEGACY(user.user_role);

    return (
      <MainLayout title="Projects">
        <DirectoryFilter baseUrl={baseUrl} />

        <div className={styles.directory}>
          {featuredProjectsList &&
            !featuredProjectsList.isEmpty() && (
              <ProjectList
                title="Featured projects"
                projects={featuredProjectsList.valueSeq()}
                showFeatured={true}
              />
            )}
          {projectsList &&
            !projectsList.isEmpty() && (
              <ProjectList
                title="Popular projects"
                projects={projectsList.valueSeq()}
              />
            )}
          {projectsList &&
            !projectsList.isEmpty() && (
              <DirectoryPaginator
                countItems={projectsCount}
                baseUrl={baseUrl}
              />
            )}
          {!isUserProjectCreator && <ProjectRequestCta />}
        </div>
      </MainLayout>
    );
  }
}

ProjectDirectory.propTypes = propTypes;
ProjectDirectory.defaultProps = defaultProps;
