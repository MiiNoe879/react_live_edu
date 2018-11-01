import styles from "./schedule.scss";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchSchedule } from "store/schedule/actions";
import { IS_USER_CREATOR_LEGACY } from "store/app/constants";
import MainLayout from "components/containers/app/main-layout";
import DirectoryFilter from "components/common/directory-filter";
import ScheduleList from "components/presentational/schedule-list";
import ProjectRequestCta from "components/presentational/project-request-cta";
import ScheduleCalendar from "components/presentational/schedule-calendar";
import ScheduleProjectCta from "components/presentational/shedule-project-cta";
import DirectoryPaginator from "components/common/directory-paginator";

const propTypes = {};

const defaultProps = {};

@withRouter
@connect(
  (state, props) => ({
    user: state.auth.get("user"),
    scheduleList: state.schedule.get("items"),
    scheduleCount: state.schedule.get("count")
  }),
  dispatch => ({
    fetchScheduleAction: (match, location) =>
      dispatch(fetchSchedule(match, location))
  })
)
export default class Schedule extends React.Component {
  componentDidMount() {
    this.props.fetchScheduleAction(this.props.match, this.props.location);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.props.fetchScheduleAction(this.props.match, this.props.location);
    }
  }

  render() {
    const { user, scheduleList, scheduleCount } = this.props;
    const baseUrl = "/schedule";
    const isUserProjectCreator = user && IS_USER_CREATOR_LEGACY(user.user_role);

    return (
      <MainLayout title="Schedule">
        <DirectoryFilter baseUrl={baseUrl} />
        <div className={styles.schedule}>
          <div className={styles.container}>
            <div className={styles.content}>
              <div className={styles.lists}>
                {scheduleList &&
                  !scheduleList.isEmpty() &&
                  scheduleList.map(item => (
                    <ScheduleList
                      date={item.get("date")}
                      projects={item.get("entries").valueSeq()}
                      key={item.get("date")}
                      user={user}
                      isUserProjectCreator={isUserProjectCreator}
                    />
                  ))}
              </div>
              {scheduleList &&
                !scheduleList.isEmpty() && (
                  <DirectoryPaginator
                    countItems={scheduleCount}
                    baseUrl={baseUrl}
                  />
                )}
              {!isUserProjectCreator && <ProjectRequestCta />}
            </div>
            <div className={styles.sidebar}>
              <ScheduleCalendar baseUrl={baseUrl} />
              {(!user || isUserProjectCreator) && <ScheduleProjectCta />}
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }
}

Schedule.propTypes = propTypes;
Schedule.defaultProps = defaultProps;
