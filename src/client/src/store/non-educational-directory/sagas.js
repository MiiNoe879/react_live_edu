import { call, put, take } from "redux-saga/effects";
import {
  FETCH_NON_EDU_PROJECTS_REQUEST,
  FETCH_NON_EDU_PROJECTS_SUCCESS,
  FETCH_NON_EDU_PROJECTS_FAILURE
} from "./constants";
import { apiGet } from "utils/api";
import { getFiltersFromUrl, getUrlFromFilters } from "utils/helpers";

export function* fetchNonEduProjectsSaga() {
  while (true) {
    const { payload } = yield take(FETCH_NON_EDU_PROJECTS_REQUEST);
    const filters = getFiltersFromUrl(payload.match, payload.location);
    filters.nonEducational = "True";
    const url = getUrlFromFilters(filters, "/projects/");

    try {
      const result = yield call(() => apiGet(url));

      if (result.ok) {
        yield put({
          type: FETCH_NON_EDU_PROJECTS_SUCCESS,
          payload: result.data
        });
      } else {
        throw result.data;
      }
    } catch (error) {
      yield put({
        type: FETCH_NON_EDU_PROJECTS_FAILURE
      });
    }
  }
}
