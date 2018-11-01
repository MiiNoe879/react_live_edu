import {
  FETCH_SCHEDULE_REQUEST,
  SCHEDULE_FOLLOW_REQUEST,
  SCHEDULE_ADD_REQUEST,
  SCHEDULE_MODAL_HIDE
} from "./constants";

export function fetchSchedule(match, location) {
  return {
    type: FETCH_SCHEDULE_REQUEST,
    payload: { match, location }
  };
}

export function follow(id) {
  return {
    type: SCHEDULE_FOLLOW_REQUEST,
    payload: id
  };
}

export function add(payload) {
  return {
    type: SCHEDULE_ADD_REQUEST,
    payload
  };
}

export function hide() {
  return {
    type: SCHEDULE_MODAL_HIDE
  };
}
