import { call, put, take } from "redux-saga/effects";
import {
  FETCH_LIVE_PROJECTS_REQUEST,
  FETCH_LIVE_PROJECTS_SUCCESS,
  FETCH_LIVE_PROJECTS_FAILURE,
  FETCH_UPCOMING_PROJECTS_REQUEST,
  FETCH_UPCOMING_PROJECTS_SUCCESS,
  FETCH_UPCOMING_PROJECTS_FAILURE
} from "./constants";
import { apiGet } from "utils/api";
import { getFiltersFromUrl, getUrlFromFilters } from "utils/helpers";

export function* fetchLiveProjectsSaga() {
  while (true) {
    const { payload } = yield take(FETCH_LIVE_PROJECTS_REQUEST);
    const filters = getFiltersFromUrl(payload.match, payload.location);
    filters.live = "True";
    const url = getUrlFromFilters(filters, "/projects/");

    try {
      const result = yield call(() => apiGet(url));

      if (result.ok) {
        yield put({
          type: FETCH_LIVE_PROJECTS_SUCCESS,
          payload: result.data
        });
      } else {
        throw result.data;
      }
    } catch (error) {
      yield put({
        type: FETCH_LIVE_PROJECTS_FAILURE
      });
    }
  }
}

export function* fetchUpcomingProjectsSaga() {
  while (true) {
    const { payload } = yield take(FETCH_UPCOMING_PROJECTS_REQUEST);
    const filters = getFiltersFromUrl(payload.match, payload.location);
    filters.upcoming = "True";
    const url = getUrlFromFilters(filters, "/projects/");

    try {
      const result = yield call(() => apiGet(url));

      if (result.ok) {
        yield put({
          type: FETCH_UPCOMING_PROJECTS_SUCCESS,
          payload: result.data
        });
      } else {
        throw result.data;
      }
    } catch (error) {
      yield put({
        type: FETCH_UPCOMING_PROJECTS_FAILURE
      });
    }
  }
}
