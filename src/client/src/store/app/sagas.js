import { call, put, take } from "redux-saga/effects";
import {
  TOPICS_REQUEST,
  TOPICS_SUCCESS,
  TOPICS_FAILURE,
  TOPICS_HIERARCHY_REQUEST,
  TOPICS_HIERARCHY_SUCCESS,
  TOPICS_HIERARCHY_FAILURE
} from "./constants";
import { apiGet } from "utils/api";

export function* fetchCategoriesSaga() {
  while (true) {
    yield take(TOPICS_REQUEST);

    try {
      const result = yield call(() => apiGet("/topics/"));
      if (result.ok) {
        yield put({
          type: TOPICS_SUCCESS,
          payload: result.data.results
        });
      } else {
        throw result.data;
      }
    } catch (error) {
      yield put({
        type: TOPICS_FAILURE,
        error
      });
    }
  }
}

export function* fetchTopicsHierarchySaga() {
  while (true) {
    yield take(TOPICS_HIERARCHY_REQUEST);

    try {
      const result = yield call(() => apiGet("/topics-hierarchy/"));

      if (result.ok) {
        yield put({
          type: TOPICS_HIERARCHY_SUCCESS,
          payload: result.data.results
        });
      } else {
        throw result.data;
      }
    } catch (error) {
      yield put({
        type: TOPICS_HIERARCHY_FAILURE
      });
    }
  }
}
