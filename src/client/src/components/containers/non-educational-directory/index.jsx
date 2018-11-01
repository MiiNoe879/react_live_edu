import styles from "./non-educational-directory.scss";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchNonEduProjects } from "store/non-educational-directory/actions";
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
    projectsList: state.nonEduDirectory.get("items"),
    projectsCount: state.nonEduDirectory.get("count")
  }),
  dispatch => ({
    fetchProjectsAction: (match, location) =>
      dispatch(fetchNonEduProjects(match, location))
  })
)
export default class NonEducationalDirectory extends React.Component {
  componentDidMount() {
    this.props.fetchProjectsAction(this.props.match, this.props.location);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.props.fetchProjectsAction(this.props.match, this.props.location);
    }
  }

  render() {
    const { user, projectsList, projectsCount } = this.props;
    const baseUrl = "/non-educational";
    const isUserProjectCreator = user && IS_USER_CREATOR_LEGACY(user.user_role);

    return (
      <MainLayout title="Non-educational projects">
        <DirectoryFilter baseUrl={baseUrl} />

        <div className={styles.directory}>
          {projectsList &&
            !projectsList.isEmpty() && (
              <ProjectList projects={projectsList.valueSeq()} />
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

NonEducationalDirectory.propTypes = propTypes;
NonEducationalDirectory.defaultProps = defaultProps;
