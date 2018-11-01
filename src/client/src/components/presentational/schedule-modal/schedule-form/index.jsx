import styles from "./schedule-form.scss";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";
import { add } from "store/schedule/actions";
import {
  getFormatedFilterDateFromDate,
  pad,
  convert24HoursTo12Hours,
  getAmPmSuffixFromHours
} from "utils/helpers";
import { getMonth } from "utils/helpers";
import Calendar from "react-calendar";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import ArrowLeftIcon from "../../../../assets/img/icons/arrow-left.svg";
import ArrowRightIcon from "../../../../assets/img/icons/arrow-right.svg";

const propTypes = {};

const defaultProps = {};

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

@connect(
  (state, props) => ({
    userProjects: state.auth.getIn(["userProjects", "items"])
  }),
  dispatch => ({
    addScheduleAction: payload => dispatch(add(payload)),
    fetchTopicsHierarchyAction: () => dispatch(fetchTopicsHierarchy())
  })
)
export default class ScheduleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      project: null,
      date: new Date(),
      time: null,
      showCalendar: false
    };

    this.showCalendar = this.showCalendar.bind(this);
    this.closeCalendar = this.closeCalendar.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearFormData = this.clearFormData.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  showCalendar(event) {
    this.setState({ showCalendar: true });
  }

  closeCalendar(event) {
    event.preventDefault();
    this.setState({ showCalendar: false });
  }

  onChange(date) {
    this.setState({ date: date, showCalendar: false, time: null });
  }

  formatDate(value) {
    return getMonth(value.getMonth());
  }

  handleSubmit(event) {
    const { addScheduleAction } = this.props;
    const { project, date, time } = this.state;

    event.preventDefault();

    if (project && time) {
      const startTime = `${getFormatedFilterDateFromDate(date)}T${time.value}`;
      const payload = {
        project: project.value,
        startTime: startTime
      };
      addScheduleAction(payload);
      this.clearFormData();
    }
  }

  clearFormData() {
    this.setState({
      project: null,
      time: null
    });
  }

  getTimeIntervalsForDate(date) {
    const interval = 30;
    const dateNow = new Date();
    const range = {
      from: 0,
      until: 23
    };
    const intervals = [];

    if (
      getFormatedFilterDateFromDate(dateNow) ===
      getFormatedFilterDateFromDate(date)
    ) {
      range.from =
        parseInt((60 - dateNow.getMinutes()) / interval) >= 2
          ? dateNow.getHours()
          : dateNow.getHours() + 1;
    }

    let time = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      range.from,
      0
    );
    const intervalsPerGivenDay =
      ((range.until - range.from) * 60) / interval + 1;

    for (let i = 0; i <= intervalsPerGivenDay; i++) {
      intervals.push({
        hours: time.getHours(),
        minutes: time.getMinutes()
      });
      time.setMinutes(time.getMinutes() + interval);
    }

    return intervals;
  }

  render() {
    const { userProjects } = this.props;
    const { date } = this.state;

    const timeIntervals = date && this.getTimeIntervalsForDate(date);

    const optionsProject = userProjects
      ? userProjects.valueSeq().map(project => {
          return { value: project.get("url"), label: project.get("title") };
        })
      : [];

    const optionsTime =
      timeIntervals &&
      timeIntervals.map(interval => {
        return {
          value: `${pad(interval.hours)}:${pad(interval.minutes)}`,
          label: `${pad(interval.hours)}:${pad(
            interval.minutes
          )} (${convert24HoursTo12Hours(interval.hours)}:${pad(
            interval.minutes
          )} ${getAmPmSuffixFromHours(interval.hours)})`
        };
      });

    return (
      <form className={styles.form}>
        <Select
          options={optionsProject}
          isDisabled={!optionsProject}
          isClearable={false}
          isRequired={true}
          className={styles.select}
          placeholder="Choose one from your projects"
          styles={customStyles}
          value={this.state.project}
          onChange={project => this.setState({ project: project })}
        />

        <div className={styles.calendarSelect}>
          <div onClick={this.showCalendar} className={styles.calendarWrapper}>
            <label className={styles.calendarLabel}>Start date:</label>
            <span className={styles.calendarInput}>
              {getFormatedFilterDateFromDate(this.state.date)}
            </span>
          </div>
          {this.state.showCalendar && (
            <React.Fragment>
              <button
                onClick={this.closeCalendar}
                className={styles.calendarClose}
              >
                <FontAwesomeIcon icon="times" className={styles.icon} />
              </button>
              <div className={styles.calendarContainer}>
                <Calendar
                  onChange={this.onChange}
                  value={this.state.date}
                  view="month"
                  prevLabel={<img src={ArrowLeftIcon} />}
                  nextLabel={<img src={ArrowRightIcon} />}
                  prev2Label={null}
                  next2Label={null}
                  onClickMonth={null}
                  className={styles.calendar}
                  formatMonthYear={value => this.formatDate(value)}
                  minDetail="month"
                  calendarType="US"
                  minDate={new Date()}
                />
              </div>
            </React.Fragment>
          )}
        </div>

        <Select
          options={optionsTime}
          isDisabled={!optionsTime}
          isRequired={true}
          className={styles.select}
          placeholder="Choose a start time"
          styles={customStyles}
          value={this.state.time}
          onChange={time => this.setState({ time: time })}
        />

        <button
          className={styles.formButton}
          type="submit"
          onClick={this.handleSubmit}
        >
          Schedule a project
        </button>
      </form>
    );
  }
}

ScheduleForm.propTypes = propTypes;
ScheduleForm.defaultProps = defaultProps;
