import styles from "./live-directory.scss";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import {
  fetchLiveProjects,
  fetchUpcomingProjects
} from "store/live-directory/actions";
import { IS_USER_CREATOR_LEGACY } from "store/app/constants";
import MainLayout from "components/containers/app/main-layout";
import DirectoryFilter from "components/common/directory-filter";
import ProjectList from "components/presentational/project-list";
import ProjectRequestCta from "components/presentational/project-request-cta";

const propTypes = {};

const defaultProps = {};

@withRouter
@connect(
  (state, props) => ({
    user: state.auth.get("user"),
    liveProjectsList: state.liveDirectory.get("items"),
    upcomingProjectsList: state.liveDirectory.get("itemsUpcoming")
  }),
  dispatch => ({
    fetchLiveProjectsAction: (match, location) =>
      dispatch(fetchLiveProjects(match, location)),
    fetchUpcomingProjectsAction: (match, location) =>
      dispatch(fetchUpcomingProjects(match, location))
  })
)
export default class LiveDirectory extends React.Component {
  componentDidMount() {
    this.props.fetchLiveProjectsAction(this.props.match, this.props.location);
    this.props.fetchUpcomingProjectsAction(
      this.props.match,
      this.props.location
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.props.fetchLiveProjectsAction(this.props.match, this.props.location);
      this.props.fetchUpcomingProjectsAction(
        this.props.match,
        this.props.location
      );
    }
  }

  render() {
    const { user, liveProjectsList, upcomingProjectsList } = this.props;
    const baseUrl = "/live";
    const isUserProjectCreator = user && IS_USER_CREATOR_LEGACY(user.user_role);

    return (
      <MainLayout title="Live!" isLive={true}>
        <DirectoryFilter baseUrl={baseUrl} />
        <div className={styles.directory}>
          {liveProjectsList &&
            !liveProjectsList.isEmpty() && (
              <ProjectList
                title="Now Streaming"
                projects={liveProjectsList.valueSeq()}
                showFeatured={true}
              />
            )}

          {upcomingProjectsList &&
            !upcomingProjectsList.isEmpty() && (
              <ProjectList
                title="Upcoming Streams"
                projects={upcomingProjectsList.valueSeq()}
                showUpcoming={true}
              />
            )}
          {!isUserProjectCreator &&
            upcomingProjectsList &&
            !upcomingProjectsList.isEmpty() && (
              <div className={styles.cta}>
                <Link to="/schedule" className={styles.link}>
                  View Schedule
                </Link>
              </div>
            )}
          {!isUserProjectCreator && <ProjectRequestCta />}
        </div>
      </MainLayout>
    );
  }
}

LiveDirectory.propTypes = propTypes;
LiveDirectory.defaultProps = defaultProps;
