import styles from "./project-requests.scss";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchProjectRequests } from "store/project-requests/actions";
import { MAX_PROJECT_REQUESTS_PER_PAGE } from "store/app/constants";
import MainLayout from "components/containers/app/main-layout";
import DirectoryFilter from "components/common/directory-filter";
import RequestsList from "components/presentational/requests-list";
import RequestsCta from "components/presentational/requests-cta";
import DirectoryPaginator from "components/common/directory-paginator";

const propTypes = {};

const defaultProps = {};

@withRouter
@connect(
  (state, props) => ({
    user: state.auth.get("user"),
    requestsList: state.projectRequests.get("items"),
    requestsCount: state.projectRequests.get("count")
  }),
  dispatch => ({
    fetchProjectRequestsAction: (match, location) =>
      dispatch(fetchProjectRequests(match, location))
  })
)
export default class ProjectRequests extends React.Component {
  componentDidMount() {
    this.props.fetchProjectRequestsAction(
      this.props.match,
      this.props.location
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.props.fetchProjectRequestsAction(
        this.props.match,
        this.props.location
      );
    }
  }

  render() {
    const { user, requestsList, requestsCount } = this.props;
    const baseUrl = "/requests";

    return (
      <MainLayout title="Project Requests">
        <DirectoryFilter baseUrl={baseUrl} />

        <div className={styles.projectRequests}>
          <div className={styles.container}>
            <div className={styles.content}>
              {requestsList && (
                <RequestsList projects={requestsList.valueSeq()} user={user} />
              )}
              {requestsList && (
                <DirectoryPaginator
                  countItems={requestsCount}
                  baseUrl={baseUrl}
                  perPage={MAX_PROJECT_REQUESTS_PER_PAGE}
                />
              )}
            </div>
            <div className={styles.sidebar}>
              <RequestsCta user={user} />
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }
}

ProjectRequests.propTypes = propTypes;
ProjectRequests.defaultProps = defaultProps;
