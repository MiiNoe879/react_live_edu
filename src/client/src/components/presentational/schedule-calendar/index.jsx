import styles from "./schedule-calendar.scss";
import React from "react";
import PropTypes from "prop-types";
import queryString from "query-string";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { push } from "connected-react-router";
import {
  getFiltersFromUrl,
  getFormatedFilterDateFromDate
} from "utils/helpers";
import { getMonth } from "utils/helpers";
import Calendar from "react-calendar";
import ArrowLeftIcon from "../../../assets/img/icons/arrow-left.svg";
import ArrowRightIcon from "../../../assets/img/icons/arrow-right.svg";

const propTypes = {};

const defaultProps = {};

@withRouter
@connect(
  (state, props) => ({
    filters: getFiltersFromUrl(props.match, props.location)
  }),
  dispatch => ({
    navigate: url => dispatch(push(url))
  })
)
export default class ScheduleCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    if (this.props.filters.date) {
      this.setState({
        date: new Date(this.props.filters.date)
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.filters.date !== prevProps.filters.date) {
      const date = this.props.filters.date || new Date();
      this.setState({
        date: new Date(date)
      });
    }
  }

  buildUrl(value) {
    const { filters, baseUrl } = this.props;
    let url = `${baseUrl}/`;

    if (filters.topic) {
      url += `${filters.topic}/`;
    }
    if (filters.category) {
      url += `${filters.category}/`;
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

    query.date = value;

    const qs = queryString.stringify(query);
    if (qs !== "") {
      url += "?" + qs;
    }

    return url;
  }

  onChange(date) {
    const todayFormated = getFormatedFilterDateFromDate(new Date());
    const dateFormated = getFormatedFilterDateFromDate(date);
    this.setState({ date });
    const url = this.buildUrl(
      todayFormated === dateFormated ? undefined : dateFormated
    );
    return this.props.navigate(url);
  }

  formatDate(value) {
    return getMonth(value.getMonth());
  }

  render() {
    return (
      <div className={styles.calendarContainer}>
        <div className={styles.header}>
          <p className={styles.title}>Calendar</p>
          <div className={styles.timezone}>
            <label className={styles.timezoneLabel}>Timezone:</label>
            <select className={styles.timezoneSelect} name="timezone">
              <option value="kyiv">Kyiv/Europe</option>
              <option value="london">London/Europe</option>
            </select>
          </div>
        </div>

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
        />
      </div>
    );
  }
}

ScheduleCalendar.propTypes = propTypes;
ScheduleCalendar.defaultProps = defaultProps;
