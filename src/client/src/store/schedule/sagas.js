import { call, put, take } from "redux-saga/effects";
import {
  FETCH_SCHEDULE_REQUEST,
  FETCH_SCHEDULE_SUCCESS,
  FETCH_SCHEDULE_FAILURE,
  SCHEDULE_FOLLOW_REQUEST,
  SCHEDULE_FOLLOW_SUCCESS,
  SCHEDULE_FOLLOW_FAILURE,
  SCHEDULE_ADD_REQUEST,
  SCHEDULE_ADD_SUCCESS,
  SCHEDULE_ADD_FAILURE,
  SCHEDULE_MODAL_SHOW
} from "./constants";
import { apiGet, apiPost } from "utils/api";
import {
  getFiltersFromUrl,
  getUrlFromFilters,
  getFormatedFilterDateFromDate
} from "utils/helpers";

export function* fetchScheduleSaga() {
  while (true) {
    const { payload } = yield take(FETCH_SCHEDULE_REQUEST);
    const filters = getFiltersFromUrl(payload.match, payload.location);
    filters.date = filters.date || getFormatedFilterDateFromDate(new Date());
    const url = getUrlFromFilters(filters, "/schedules/");

    try {
      const result = yield call(() => apiGet(url));

      if (result.ok) {
        yield put({
          type: FETCH_SCHEDULE_SUCCESS,
          payload: result.data
        });
      } else {
        throw result.data;
      }
    } catch (error) {
      yield put({
        type: FETCH_SCHEDULE_FAILURE
      });
    }
  }
}

export function* scheduleFollowSaga() {
  while (true) {
    const { payload } = yield take(SCHEDULE_FOLLOW_REQUEST);
    const url = `/projects-suggestions/${payload}/vote/`;

    try {
      const result = yield call(() => apiPost(url));

      if (result.ok) {
        yield put({
          type: SCHEDULE_FOLLOW_SUCCESS,
          payload: { id: payload, data: result.data }
        });
      } else {
        throw result.data;
      }
    } catch (error) {
      yield put({
        type: SCHEDULE_FOLLOW_FAILURE
      });
    }
  }
}

export function* scheduleAddSaga() {
  while (true) {
    const { payload } = yield take(SCHEDULE_ADD_REQUEST);
    const data = {
      project: payload.project,
      start_time: payload.startTime
    };

    try {
      const result = yield call(() => apiPost("/schedules/", data));

      if (result.ok) {
        yield put({
          type: SCHEDULE_ADD_SUCCESS
        });
        yield put({
          type: SCHEDULE_MODAL_SHOW
        });
      } else {
        throw result.data;
      }
    } catch (error) {
      yield put({
        type: SCHEDULE_ADD_FAILURE,
        error
      });
    }
  }
}
