import { call, put, take } from "redux-saga/effects";
import {
  FETCH_GUIDES_REQUEST,
  FETCH_GUIDES_SUCCESS,
  FETCH_GUIDES_FAILURE
} from "./constants";
import { apiGet } from "utils/api";
import { getFiltersFromUrl, getUrlFromFilters } from "utils/helpers";

export function* fetchGuidesSaga() {
  while (true) {
    const { payload } = yield take(FETCH_GUIDES_REQUEST);
    const filters = getFiltersFromUrl(payload.match, payload.location);
    filters.onlyListed = "True";
    filters.guidesOrdering = "-count_projects";
    filters.guidesLimit = "False";
    const url = getUrlFromFilters(filters, "/categories/");

    try {
      const result = yield call(() => apiGet(url));

      if (result.ok) {
        yield put({
          type: FETCH_GUIDES_SUCCESS,
          payload: result.data
        });
      } else {
        throw result.data;
      }
    } catch (error) {
      yield put({
        type: FETCH_GUIDES_FAILURE
      });
    }
  }
}
