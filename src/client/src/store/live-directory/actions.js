import {
  FETCH_LIVE_PROJECTS_REQUEST,
  FETCH_UPCOMING_PROJECTS_REQUEST
} from "./constants";

export function fetchLiveProjects(match, location) {
  return {
    type: FETCH_LIVE_PROJECTS_REQUEST,
    payload: { match, location }
  };
}

export function fetchUpcomingProjects(match, location) {
  return {
    type: FETCH_UPCOMING_PROJECTS_REQUEST,
    payload: { match, location }
  };
}
