import queryString from "query-string";
import {
  MAX_PROJECTS_PER_PAGE,
  MAX_PROJECT_REQUESTS_PER_PAGE,
  ORDERING_FILTER_OPTIONS,
  REQUESTS_ORDERING_FILTER_OPTIONS,
  DIFFICULTY_FILTER_OPTIONS,
  LANGUAGE_FILTER_OPTIONS
} from "store/app/constants";

export const isDevMode =
  (window && window.location && window.location.hostname) === "localhost" ||
  (window && window.location && window.location.hostname) === "127.0.0.1";

export function socialNetworkMapping(network) {
  if (network === "windows") {
    return "windowslive";
  }
  if (network === "linkedin") {
    return "linkedin_oauth2";
  }
  return network;
}

export function reverseSocialNetworkMapping(network) {
  if (network === "windowslive") {
    return "windows";
  }
  if (network === "linkedin_oauth2") {
    return "linkedin";
  }
  return network;
}

export function getErrorType(error, errors) {
  if (errors[error.type]) {
    return errors[error.type].type;
  } else {
    return errors.DEFAULT.type;
  }
}

export function pad(n) {
  return n < 10 ? "0" + n : n;
}

export function getOrdinalSuffix(n) {
  return [, "st", "nd", "rd"][(n % 100 >> 3) ^ 1 && n % 10] || "th";
}

export function convert24HoursTo12Hours(hours) {
  return hours <= 12 ? hours || 12 : hours - 12;
}

export function getDay(number) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  return days[number];
}

export function getMonth(number) {
  const months = [
    "January", // "Jan",
    "February", // "Feb",
    "March", // "Mar",
    "April", // "Apr",
    "May", // "May",
    "June", // "Jun",
    "July", // "Jul",
    "August", // "Aug",
    "September", // "Sep",
    "October", // "Oct",
    "November", // "Nov",
    "December" // "Dec",
  ];

  return months[number];
}

export function getFormatedFilterDateFromDate(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}`;
}

export function getFormatedDateFromTimestamp(timestamp) {
  const date = new Date(timestamp);
  const formatedDate = `${date.getDate()} ${getMonth(
    date.getMonth()
  )} ${date.getFullYear()}`;
  return formatedDate;
}

export function getFormatedDateFromDate(datestamp) {
  const date = new Date(datestamp);
  const formatedDate = `${getDay(date.getDay())}, ${getMonth(
    date.getMonth()
  )} ${date.getDate()}${getOrdinalSuffix(date.getDate())}`;

  return formatedDate;
}

export function get12HoursTimeFromTimestamp(timestamp) {
  const date = new Date(timestamp);
  const hours = convert24HoursTo12Hours(date.getHours());
  const formatedTime = `${hours}:${pad(date.getMinutes())}`;
  return formatedTime;
}

export function getAmPmSuffixFromHours(hours) {
  return hours < 12 ? "AM" : "PM";
}

export function getAmPmSuffixFromTimestamp(timestamp) {
  const date = new Date(timestamp);
  const suffix = getAmPmSuffixFromHours(date.getHours());
  return suffix;
}

export function getFormatedTimeFromSeconds(seconds) {
  var h = Math.floor(seconds / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  var s = Math.floor((seconds % 3600) % 60);

  var hDisplay = h > 0 ? h + "h " : "";
  var mDisplay = m > 0 ? m + "m" : "";
  var sDisplay = s > 0 ? s + "s" : "";

  return hDisplay + mDisplay;
}

export function getFiltersFromUrl(match, location) {
  const filters = {};
  filters.topic = match.params.topic;
  filters.category = match.params.category;
  filters.page = match.params.page;

  const query = queryString.parse(location.search);
  filters.difficulty = query.difficulty;
  filters.language = query.language;
  filters.ordering = query.ordering;
  filters.search = query.q;
  filters.date = query.date;

  return filters;
}

export function getUrlFromFilters(filters, baseUrl) {
  const maxItemsPerPage =
    baseUrl === "/projects-suggestions/"
      ? MAX_PROJECT_REQUESTS_PER_PAGE
      : MAX_PROJECTS_PER_PAGE;
  const queryArgs = {
    topic: filters.topic !== "all" ? filters.topic : undefined,
    category: filters.category !== "all" ? filters.category : undefined,
    difficulty: filters.difficulty
      ? getDifficultyValueOfRoute(filters.difficulty)
      : undefined,
    language: filters.language
      ? getLanguageValueOfRoute(filters.language)
      : undefined,
    ordering: filters.ordering
      ? getOrderingValueOfRoute(filters.ordering, baseUrl)
      : baseUrl === "/projects-suggestions/"
        ? "-num_vote_up"
        : undefined,
    search: filters.search,
    offset: getOffsetFromPage(filters.page, maxItemsPerPage),
    limit: maxItemsPerPage
  };

  if (filters.featured) {
    queryArgs.is_featured = filters.featured;
  }
  if (filters.live) {
    queryArgs.is_live = filters.live;
  }
  if (filters.upcoming) {
    queryArgs.is_upcoming = filters.upcoming;
  }
  if (filters.nonEducational) {
    queryArgs.is_non_educational = filters.nonEducational;
  }
  if (filters.onlyListed) {
    queryArgs.only_listed = filters.onlyListed;
  }
  if (filters.guidesOrdering) {
    queryArgs.ordering = filters.guidesOrdering;
  }
  if (filters.guidesLimit) {
    queryArgs.offset = undefined;
    queryArgs.limit = undefined;
  }
  if (filters.date) {
    queryArgs.start_time = filters.date;
  }

  const query = queryString.stringify(queryArgs);
  const url = baseUrl + (query.length ? "?" + query : "");

  return url;
}

export function getOrderingValueOfRoute(route, baseUrl) {
  const options =
    baseUrl === "/projects-suggestions/"
      ? REQUESTS_ORDERING_FILTER_OPTIONS
      : ORDERING_FILTER_OPTIONS;
  const value = options.filter(option => option.route === route)[0].value;
  return value;
}

export function getDifficultyValueOfRoute(route) {
  const options = DIFFICULTY_FILTER_OPTIONS;
  const value = options.filter(option => option.route === route)[0].value;
  return value;
}

export function getLanguageValueOfRoute(route) {
  const options = LANGUAGE_FILTER_OPTIONS;
  const value = options.filter(option => option.route === route)[0].value;
  return value;
}

export function getOffsetFromPage(page, maxItemsPerPage) {
  const pageInt = /^(\d+)$/.exec(page) ? parseInt(page, 10) : 1;
  return pageInt >= 2 ? (pageInt - 1) * maxItemsPerPage : undefined;
}
