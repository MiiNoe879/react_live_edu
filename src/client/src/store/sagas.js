import { all, fork, take, cancel } from "redux-saga/effects";
import { fetchCategoriesSaga } from "store/app/sagas";
import {
  meSaga,
  meProjectsSaga,
  logInSaga,
  signUpSaga,
  logOutSaga,
  confirmEmailSaga,
  socialAppsSaga,
  socialAppsValidateSaga,
  signUpSocialSaga,
  signupStep0Saga,
  signupStep1Saga,
  passwordResetSaga,
  passwordResetConfirmSaga
} from "store/auth/sagas";
import {
  fetchProjectRequestsSaga,
  projectRequestsVoteSaga,
  projectRequestsAddSaga
} from "store/project-requests/sagas";
import {
  fetchProjectsSaga,
  fetchFeaturedProjectsSaga
} from "store/project-directory/sagas";
import {
  fetchLiveProjectsSaga,
  fetchUpcomingProjectsSaga
} from "store/live-directory/sagas";
import { fetchNonEduProjectsSaga } from "store/non-educational-directory/sagas";
import { fetchGuidesSaga } from "store/guides-directory/sagas";
import {
  fetchScheduleSaga,
  scheduleFollowSaga,
  scheduleAddSaga
} from "store/schedule/sagas";
import { fetchTopicsHierarchySaga } from "store/app/sagas";

export function* initSaga() {
  // This saga is meant to initialize stuff that's very common and assumed to always exist.
  // I.e. it's used when just doesn't make sense to add dispatch in every Component's constructor.
  if (!window.opener) {
    yield all([meSaga(), fetchCategoriesSaga()]);
  }
}

export function* rootSaga() {
  yield all([
    confirmEmailSaga(),
    meProjectsSaga(),
    logInSaga(),
    signUpSaga(),
    logOutSaga(),
    socialAppsSaga(),
    socialAppsValidateSaga(),
    signUpSocialSaga(),
    signupStep0Saga(),
    signupStep1Saga(),
    passwordResetSaga(),
    passwordResetConfirmSaga(),
    fetchProjectRequestsSaga(),
    projectRequestsVoteSaga(),
    projectRequestsAddSaga(),
    fetchTopicsHierarchySaga(),
    fetchProjectsSaga(),
    fetchFeaturedProjectsSaga(),
    fetchLiveProjectsSaga(),
    fetchUpcomingProjectsSaga(),
    fetchNonEduProjectsSaga(),
    fetchGuidesSaga(),
    fetchScheduleSaga(),
    scheduleFollowSaga(),
    scheduleAddSaga(),
    initSaga() // must be the last entry
  ]);
}

export const CANCEL_SAGAS_HMR = "CANCEL_SAGAS_HMR";

function createAbortableSaga(saga) {
  if (process.env.NODE_ENV === "development") {
    return function* main() {
      const sagaTask = yield fork(saga);
      yield take(CANCEL_SAGAS_HMR);
      yield cancel(sagaTask);
    };
  }
  return saga;
}

const SagaManager = {
  startSaga(sagaMiddleware) {
    return sagaMiddleware.run(createAbortableSaga(rootSaga));
  },
  cancelSaga(store) {
    store.dispatch({
      type: CANCEL_SAGAS_HMR
    });
  }
};

export default SagaManager;
