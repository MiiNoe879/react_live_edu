import {
  FETCH_PROJECT_REQUESTS_REQUEST,
  PROJECT_REQUESTS_VOTE_REQUEST,
  PROJECT_REQUESTS_ADD_REQUEST,
  PROJECT_REQUESTS_MODAL_HIDE
} from "./constants";

export function fetchProjectRequests(match, location) {
  return {
    type: FETCH_PROJECT_REQUESTS_REQUEST,
    payload: { match, location }
  };
}

export function vote(id) {
  return {
    type: PROJECT_REQUESTS_VOTE_REQUEST,
    payload: id
  };
}

export function add(payload) {
  return {
    type: PROJECT_REQUESTS_ADD_REQUEST,
    payload
  };
}

export function hide() {
  return {
    type: PROJECT_REQUESTS_MODAL_HIDE
  };
}
