import { all, call, put, take, select } from "redux-saga/effects";
import {
  ME_REQUEST,
  ME_SUCCESS,
  ME_FAILURE,
  ME_PROJECTS_REQUEST,
  ME_PROJECTS_SUCCESS,
  ME_PROJECTS_FAILURE,
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_SOCIAL_REQUEST,
  SIGNUP_SOCIAL_SUCCESS,
  SIGNUP_SOCIAL_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  CONFIRM_EMAIL_REQUEST,
  CONFIRM_EMAIL_SUCCESS,
  CONFIRM_EMAIL_FAILURE,
  SOCIAL_APPS_REQUEST,
  SOCIAL_APPS_SUCCESS,
  SOCIAL_APPS_FAILURE,
  SOCIAL_APPS_VALIDATE_REQUEST,
  SOCIAL_APPS_VALIDATE_SUCCESS,
  SOCIAL_APPS_VALIDATE_FAILURE,
  SET_LOGIN_FORM_ERROR,
  CLEAR_LOGIN_FORM_ERROR,
  SIGNUP_SOCIAL_ERRORS,
  SIGNUP_STEP_0_REQUEST,
  SIGNUP_STEP_1_REQUEST,
  SIGNUP_STEP_SET_EMAIL,
  SIGNUP_STEP_SET_PASSWORD,
  SIGNUP_STEP_SET_PASS_CONFIRM,
  SET_SIGNUP_STEP_0_ERROR,
  SET_SIGNUP_STEP_1_ERROR,
  CLEAR_SIGNUP_STEP_0_ERROR,
  CLEAR_SIGNUP_STEP_1_ERROR,
  SIGNUP_STEP_SET_USERNAME,
  CLEAR_SIGNUP_STEPS,
  SET_SIGNUP_FORM_ERROR,
  CLEAR_SIGNUP_FORM_ERROR,
  SIGNUP_STEP_SET_CONFIRM_EMAIL,
  SET_CONFIRM_EMAIL_ERROR,
  CLEAR_CONFIRM_EMAIL_ERROR,
  SET_PASSWORD_RESET_EMAIL,
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAILURE,
  SET_PASSWORD_RESET_ERROR,
  CLEAR_PASSWORD_RESET_ERROR,
  PASSWORD_RESET_CONFIRM_REQUEST,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAILURE
} from "./constants";
import { apiGet, apiPost } from "utils/api";
import { getErrorType } from "utils/helpers";
import { getSignupFormData, getSignupSocialFormData } from "./selectors";

export function* meSaga() {
  yield put({ type: ME_REQUEST });

  try {
    const result = yield call(() => apiGet("/me/"));
    if (result.ok) {
      yield put({
        type: ME_SUCCESS,
        payload: result.data
      });
    } else {
      throw result.data;
    }
  } catch (error) {
    yield put({
      type: ME_FAILURE,
      error
    });
  }
}

export function* meProjectsSaga() {
  const { payload } = yield take(ME_PROJECTS_REQUEST);

  try {
    const result = yield call(() => apiGet(`/users/${payload}/projects/`));
    if (result.ok) {
      yield put({
        type: ME_PROJECTS_SUCCESS,
        payload: result.data
      });
    } else {
      throw result.data;
    }
  } catch (error) {
    yield put({
      type: ME_PROJECTS_FAILURE,
      error
    });
  }
}

export function* confirmEmailSaga() {
  while (true) {
    const { payload } = yield take(CONFIRM_EMAIL_REQUEST);

    try {
      const result = yield call(() =>
        apiPost("/auth/registration/verify-email/", payload)
      );

      if (result.ok) {
        yield put({
          type: CONFIRM_EMAIL_SUCCESS
        });
        yield put({
          type: CLEAR_CONFIRM_EMAIL_ERROR
        });
      } else {
        throw result.data;
      }
    } catch (error) {
      yield put({
        type: CONFIRM_EMAIL_FAILURE
      });
      yield put({
        type: SET_CONFIRM_EMAIL_ERROR,
        error
      });
    }
  }
}

export function* logInSaga() {
  while (true) {
    const { payload } = yield take(LOGIN_REQUEST);

    try {
      const result = yield call(() => apiPost("/auth/login/", payload));

      if (result.ok) {
        yield put({
          type: LOGIN_SUCCESS,
          payload: result.data.user
        });
        yield put({
          type: CLEAR_LOGIN_FORM_ERROR
        });
      } else {
        throw result.data;
      }
    } catch (error) {
      yield put({
        type: LOGIN_FAILURE,
        error
      });
      yield put({
        type: SET_LOGIN_FORM_ERROR,
        error
      });
    }
  }
}

export function* signUpSaga() {
  while (true) {
    yield take(SIGNUP_REQUEST);

    const data = yield select(getSignupFormData);

    try {
      const result = yield call(() =>
        apiPost("/auth/registration/register/", data)
      );

      if (result.ok) {
        yield put({
          type: SIGNUP_SUCCESS
        });
        yield put({
          type: SIGNUP_STEP_SET_CONFIRM_EMAIL,
          payload: data.email
        });
        yield put({
          type: CLEAR_SIGNUP_STEPS
        });
        yield put({
          type: CLEAR_SIGNUP_FORM_ERROR
        });
      } else {
        throw result.data;
      }
    } catch (error) {
      yield put({
        type: SIGNUP_FAILURE
      });
      yield put({
        type: SET_SIGNUP_FORM_ERROR,
        error
      });
    }
  }
}

export function* passwordResetSaga() {
  while (true) {
    const { payload } = yield take(PASSWORD_RESET_REQUEST);

    try {
      const result = yield call(() =>
        apiPost("/auth/password/reset/", payload)
      );

      if (result.ok) {
        yield put({
          type: PASSWORD_RESET_SUCCESS
        });
        yield put({
          type: SET_PASSWORD_RESET_EMAIL,
          payload: payload.email
        });
        yield put({
          type: CLEAR_PASSWORD_RESET_ERROR
        });
      } else {
        throw result.data;
      }
    } catch (error) {
      yield put({
        type: PASSWORD_RESET_FAILURE,
        error
      });
      yield put({
        type: SET_PASSWORD_RESET_ERROR,
        error: error.email
      });
    }
  }
}

export function* passwordResetConfirmSaga() {
  while (true) {
    const { payload } = yield take(PASSWORD_RESET_CONFIRM_REQUEST);

    try {
      const result = yield call(() =>
        apiPost("/auth/password/reset/confirm/", {
          new_password1: payload.password,
          new_password2: payload.passwordConfirm,
          uid: payload.uid,
          token: payload.token
        })
      );

      if (result.ok) {
        yield put({
          type: PASSWORD_RESET_CONFIRM_SUCCESS
        });
        yield put({
          type: CLEAR_PASSWORD_RESET_ERROR
        });
      } else {
        const errors = [];

        Object.keys(result.data).forEach(key =>
          errors.push(result.data[key][0])
        );

        throw errors;
      }
    } catch (error) {
      yield put({
        type: PASSWORD_RESET_CONFIRM_FAILURE
      });
      yield put({
        type: SET_PASSWORD_RESET_ERROR,
        error
      });
    }
  }
}

export function* logOutSaga() {
  while (true) {
    yield take(LOGOUT_REQUEST);

    try {
      const result = yield call(() => apiPost("/auth/logout/"));

      if (result.ok) {
        yield put({ type: LOGOUT_SUCCESS });
      } else {
        throw result.data;
      }
    } catch (error) {
      yield put({
        type: LOGOUT_FAILURE,
        error
      });
    }
  }
}

export function* socialAppsSaga() {
  while (true) {
    yield take(SOCIAL_APPS_REQUEST);

    try {
      const result = yield call(() => apiGet("/auth/social/apps/"));

      if (result.ok) {
        yield put({
          type: SOCIAL_APPS_SUCCESS,
          payload: result.data
        });
      } else {
        throw result.data;
      }
    } catch (error) {
      yield put({
        type: SOCIAL_APPS_FAILURE
      });
    }
  }
}

export function* socialAppsValidateSaga() {
  while (true) {
    const { payload } = yield take(SOCIAL_APPS_VALIDATE_REQUEST);

    try {
      const result = yield call(() => apiPost("/auth/social/", payload));

      if (result.ok) {
        yield put({
          type: SOCIAL_APPS_VALIDATE_SUCCESS,
          payload: result.data.user
        });
      } else {
        throw result.data;
      }
    } catch (error) {
      yield put({
        type: SOCIAL_APPS_VALIDATE_FAILURE,
        error: getErrorType(error, SIGNUP_SOCIAL_ERRORS),
        payload: payload
      });
    }
  }
}

export function* signUpSocialSaga() {
  while (true) {
    yield take(SIGNUP_SOCIAL_REQUEST);

    const data = yield select(getSignupSocialFormData);

    try {
      const result = yield call(() => apiPost("/auth/social/register/", data));

      if (result.ok) {
        yield put({
          type: SIGNUP_SOCIAL_SUCCESS,
          payload: data.get("email")
        });
        yield put({
          type: CLEAR_SIGNUP_STEPS
        });
        yield put({
          type: CLEAR_SIGNUP_FORM_ERROR
        });
      } else {
        throw result.data;
      }
    } catch (error) {
      yield put({
        type: SIGNUP_SOCIAL_FAILURE
      });
      yield put({
        type: SET_SIGNUP_FORM_ERROR,
        error
      });
    }
  }
}

export function* signupStep0Saga() {
  while (true) {
    const { payload } = yield take(SIGNUP_STEP_0_REQUEST);

    try {
      const { email, password } = yield all({
        email: call(() =>
          apiPost("/auth/registration/check-email/", { email: payload.email })
        ),
        password: call(() =>
          apiPost("/auth/registration/check-password/", {
            password1: payload.password,
            password2: payload.passwordConfirm
          })
        )
      });
      const errors = [];

      if (!email.ok) {
        errors.push(email.data.email[0]);
      }

      if (!password.ok) {
        if (password.data.password1) {
          errors.push(password.data.password1[0]);
        }
        if (password.data.password2) {
          errors.push(password.data.password2[0]);
        }
        if (password.data.non_field_errors) {
          errors.push(password.data.non_field_errors[0]);
        }
      }

      if (email.ok && password.ok) {
        yield put({
          type: SIGNUP_STEP_SET_EMAIL,
          payload: payload.email
        });
        yield put({
          type: SIGNUP_STEP_SET_PASSWORD,
          payload: payload.password
        });
        yield put({
          type: SIGNUP_STEP_SET_PASS_CONFIRM,
          payload: payload.passwordConfirm
        });
        yield put({
          type: CLEAR_SIGNUP_STEP_0_ERROR
        });
      } else {
        throw errors;
      }
    } catch (error) {
      yield put({
        type: SET_SIGNUP_STEP_0_ERROR,
        error
      });
    }
  }
}

export function* signupStep1Saga() {
  while (true) {
    const { payload } = yield take(SIGNUP_STEP_1_REQUEST);

    try {
      const username = yield call(() =>
        apiPost("/auth/registration/check-username/", {
          username: payload.username
        })
      );

      const errors = [];

      if (!username.ok) {
        errors.push(username.data.username[0]);
      }

      if (username.ok) {
        yield put({
          type: SIGNUP_STEP_SET_USERNAME,
          payload: payload.username
        });
        yield put({
          type: CLEAR_SIGNUP_STEP_1_ERROR
        });
      } else {
        throw errors;
      }
    } catch (error) {
      yield put({
        type: SET_SIGNUP_STEP_1_ERROR,
        error
      });
    }
  }
}
