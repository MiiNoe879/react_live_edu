import { call, put, take } from "redux-saga/effects";
import {
  FETCH_PROJECT_REQUESTS_REQUEST,
  FETCH_PROJECT_REQUESTS_SUCCESS,
  FETCH_PROJECT_REQUESTS_FAILURE,
  PROJECT_REQUESTS_VOTE_REQUEST,
  PROJECT_REQUESTS_VOTE_FAILURE,
  PROJECT_REQUESTS_VOTE_SUCCESS,
  PROJECT_REQUESTS_ADD_REQUEST,
  PROJECT_REQUESTS_ADD_SUCCESS,
  PROJECT_REQUESTS_ADD_FAILURE,
  PROJECT_REQUESTS_MODAL_SHOW
} from "store/project-requests/constants";
import { apiGet, apiPost } from "utils/api";
import { getFiltersFromUrl, getUrlFromFilters } from "utils/helpers";

export function* fetchProjectRequestsSaga() {
  while (true) {
    const { payload } = yield take(FETCH_PROJECT_REQUESTS_REQUEST);
    const filters = getFiltersFromUrl(payload.match, payload.location);
    const url = getUrlFromFilters(filters, "/projects-suggestions/");

    try {
      const result = yield call(() => apiGet(url));

      if (result.ok) {
        yield put({
          type: FETCH_PROJECT_REQUESTS_SUCCESS,
          payload: result.data
        });
      } else {
        throw result.data;
      }
    } catch (error) {
      yield put({
        type: FETCH_PROJECT_REQUESTS_FAILURE
      });
    }
  }
}

export function* projectRequestsVoteSaga() {
  while (true) {
    const { payload } = yield take(PROJECT_REQUESTS_VOTE_REQUEST);
    const url = `/projects-suggestions/${payload}/vote/`;

    try {
      const result = yield call(() => apiPost(url));

      if (result.ok) {
        yield put({
          type: PROJECT_REQUESTS_VOTE_SUCCESS,
          payload: { id: payload, data: result.data }
        });
      } else {
        throw result.data;
      }
    } catch (error) {
      yield put({
        type: PROJECT_REQUESTS_VOTE_FAILURE
      });
    }
  }
}

export function* projectRequestsAddSaga() {
  while (true) {
    const { payload } = yield take(PROJECT_REQUESTS_ADD_REQUEST);
    try {
      const languageResult = yield call(() =>
        apiGet(`/languages/${payload.language}/`)
      );

      if (languageResult.ok) {
        const languageUrl = languageResult.data.url;
        payload.language = languageUrl;
      } else {
        throw result.data;
      }

      const result = yield call(() =>
        apiPost("/projects-suggestions/", payload)
      );

      if (result.ok) {
        yield put({
          type: PROJECT_REQUESTS_ADD_SUCCESS
        });
        yield put({
          type: PROJECT_REQUESTS_MODAL_SHOW
        });
      } else {
        throw result.data;
      }
    } catch (error) {
      yield put({
        type: PROJECT_REQUESTS_ADD_FAILURE,
        error
      });
    }
  }
}
