import { call, put, take } from "redux-saga/effects";
import {
  FETCH_PROJECTS_REQUEST,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_FAILURE,
  FETCH_FEATURED_PROJECTS_REQUEST,
  FETCH_FEATURED_PROJECTS_SUCCESS,
  FETCH_FEATURED_PROJECTS_FAILURE
} from "./constants";
import { apiGet } from "utils/api";
import { getFiltersFromUrl, getUrlFromFilters } from "utils/helpers";

export function* fetchProjectsSaga() {
  while (true) {
    const { payload } = yield take(FETCH_PROJECTS_REQUEST);
    const filters = getFiltersFromUrl(payload.match, payload.location);
    filters.featured = "False";
    const url = getUrlFromFilters(filters, "/projects/");

    try {
      const result = yield call(() => apiGet(url));

      if (result.ok) {
        yield put({
          type: FETCH_PROJECTS_SUCCESS,
          payload: result.data
        });
      } else {
        throw result.data;
      }
    } catch (error) {
      yield put({
        type: FETCH_PROJECTS_FAILURE
      });
    }
  }
}

export function* fetchFeaturedProjectsSaga() {
  while (true) {
    const { payload } = yield take(FETCH_FEATURED_PROJECTS_REQUEST);
    const filters = getFiltersFromUrl(payload.match, payload.location);
    filters.featured = "True";
    const url = getUrlFromFilters(filters, "/projects/");

    try {
      const result = yield call(() => apiGet(url));

      if (result.ok) {
        yield put({
          type: FETCH_FEATURED_PROJECTS_SUCCESS,
          payload: result.data
        });
      } else {
        throw result.data;
      }
    } catch (error) {
      yield put({
        type: FETCH_FEATURED_PROJECTS_FAILURE
      });
    }
  }
}
