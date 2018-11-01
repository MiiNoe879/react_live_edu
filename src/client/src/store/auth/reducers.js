import { fromJS, OrderedMap, Map } from "immutable";
import {
  ME_SUCCESS,
  ME_FAILURE,
  ME_PROJECTS_SUCCESS,
  ME_PROJECTS_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SET_LOGIN_FORM_ERROR,
  CLEAR_LOGIN_FORM_ERROR,
  SET_SIGNUP_FORM_ERROR,
  CLEAR_SIGNUP_FORM_ERROR,
  LOGOUT_SUCCESS,
  SIGNUP_STEP_SET_EMAIL,
  SIGNUP_STEP_SET_PASSWORD,
  SIGNUP_STEP_SET_PASS_CONFIRM,
  SIGNUP_STEP_SET_USERNAME,
  SIGNUP_STEP_SET_ROLE,
  SIGNUP_STEP_SET_SKYPE,
  SIGNUP_STEP_SET_HANGOUTS,
  SIGNUP_STEP_SET_WANT_LEARN,
  SIGNUP_STEP_SET_CONFIRM_EMAIL,
  CONFIRM_EMAIL_SUCCESS,
  CONFIRM_EMAIL_FAILURE,
  SOCIAL_APPS_SUCCESS,
  SOCIAL_APPS_FAILURE,
  SOCIAL_APPS_VALIDATE_FAILURE,
  SOCIAL_APPS_VALIDATE_SUCCESS,
  SET_SIGNUP_STEP_0_ERROR,
  CLEAR_SIGNUP_STEP_0_ERROR,
  SET_SIGNUP_STEP_1_ERROR,
  CLEAR_SIGNUP_STEP_1_ERROR,
  SET_SIGNUP_STEP_3_ERROR,
  CLEAR_SIGNUP_STEP_3_ERROR,
  CLEAR_SIGNUP_STEPS,
  CLEAR_SIGNUP_SOCIAL_ERROR,
  SET_CONFIRM_EMAIL_ERROR,
  CLEAR_CONFIRM_EMAIL_ERROR,
  SET_PASSWORD_RESET_EMAIL,
  SET_PASSWORD_RESET_ERROR,
  CLEAR_PASSWORD_RESET_ERROR,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAILURE,
  CLEAR_CONFIRM_EMAIL
} from "./constants";

const initialState = fromJS({
  loginForm: {
    error: undefined
  },
  signupForm: {
    error: undefined
  },
  signupStep0: {
    email: undefined,
    password: undefined,
    passwordConfirm: undefined,
    error: undefined
  },
  signupStep1: {
    username: undefined,
    error: undefined
  },
  signupStep2: {
    role: undefined,
    error: undefined
  },
  signupStep3: {
    wantLearn: undefined,
    skype: undefined,
    hangouts: undefined,
    error: undefined
  },
  signupSocial: {
    access_token: undefined,
    network: undefined,
    error: undefined
  },
  confirmEmail: {
    email: undefined,
    confirmed: undefined,
    error: undefined
  },
  passwordReset: {
    email: undefined,
    confirmed: undefined,
    error: undefined
  },
  socialApps: undefined,
  user: undefined,
  userProjects: {
    items: undefined,
    count: undefined
  }
});

export default function(state = initialState, action) {
  const { type, payload, error } = action;

  switch (type) {
    case ME_SUCCESS:
      return state.set("user", payload);
    case ME_FAILURE:
      return state.set("user", undefined);

    case ME_PROJECTS_SUCCESS:
      return state
        .setIn(
          ["userProjects", "items"],
          OrderedMap(payload.results.map(value => [value.id, Map(value)]))
        )
        .setIn(["userProjects", "count"], payload.count);
    case ME_PROJECTS_FAILURE:
      return state.set("userProjects", initialState.get("userProjects"));

    case LOGIN_SUCCESS:
      return state.set("user", payload);
    case LOGIN_FAILURE:
      return state.set("user", undefined);
    case SET_LOGIN_FORM_ERROR:
      return state.setIn(["loginForm", "error"], error);
    case CLEAR_LOGIN_FORM_ERROR:
      return state.setIn(["loginForm", "error"], undefined);
    case SET_SIGNUP_FORM_ERROR:
      return state.setIn(["signupForm", "error"], error);
    case CLEAR_SIGNUP_FORM_ERROR:
      return state.setIn(["signupForm", "error"], undefined);

    case LOGOUT_SUCCESS:
      return state
        .set("user", undefined)
        .set("userProjects", initialState.get("userProjects"));

    case SIGNUP_STEP_SET_EMAIL:
      return state.setIn(["signupStep0", "email"], payload);
    case SIGNUP_STEP_SET_PASSWORD:
      return state.setIn(["signupStep0", "password"], payload);
    case SIGNUP_STEP_SET_PASS_CONFIRM:
      return state.setIn(["signupStep0", "passwordConfirm"], payload);
    case SIGNUP_STEP_SET_USERNAME:
      return state.setIn(["signupStep1", "username"], payload);
    case SIGNUP_STEP_SET_ROLE:
      return state.setIn(["signupStep2", "role"], payload);
    case SIGNUP_STEP_SET_SKYPE:
      return state.setIn(["signupStep3", "skype"], payload);
    case SIGNUP_STEP_SET_HANGOUTS:
      return state.setIn(["signupStep3", "hangouts"], payload);
    case SIGNUP_STEP_SET_WANT_LEARN:
      return state.setIn(["signupStep3", "wantLearn"], payload);
    case SIGNUP_STEP_SET_CONFIRM_EMAIL:
      return state.setIn(["confirmEmail", "email"], payload);

    case CONFIRM_EMAIL_SUCCESS:
      return state.setIn(["confirmEmail", "confirmed"], true);
    case CONFIRM_EMAIL_FAILURE:
      return state.setIn(["confirmEmail", "confirmed"], false);
    case SET_CONFIRM_EMAIL_ERROR:
      return state.setIn(["confirmEmail", "error"], error);
    case CLEAR_CONFIRM_EMAIL_ERROR:
      return state.setIn(["confirmEmail", "error"], undefined);

    case SET_PASSWORD_RESET_EMAIL:
      return state.setIn(["passwordReset", "email"], payload);
    case SET_PASSWORD_RESET_ERROR:
      return state.setIn(["passwordReset", "error"], error);
    case CLEAR_PASSWORD_RESET_ERROR:
      return state.setIn(["passwordReset", "error"], undefined);
    case PASSWORD_RESET_CONFIRM_SUCCESS:
      return state.setIn(["passwordReset", "confirmed"], true);
    case PASSWORD_RESET_CONFIRM_FAILURE:
      return state.setIn(["passwordReset", "confirmed"], false);

    case SOCIAL_APPS_SUCCESS:
      return state.set("socialApps", payload);
    case SOCIAL_APPS_FAILURE:
      return state.set("socialApps", undefined);

    case SOCIAL_APPS_VALIDATE_SUCCESS:
      return state.set("user", payload);
    case SOCIAL_APPS_VALIDATE_FAILURE:
      return state
        .setIn(["signupSocial", "error"], error)
        .setIn(["signupSocial", "access_token"], payload.access_token)
        .setIn(["signupSocial", "network"], payload.network);
    case CLEAR_SIGNUP_SOCIAL_ERROR:
      return state.setIn(["signupSocial", "error"], undefined);

    case SET_SIGNUP_STEP_0_ERROR:
      return state.setIn(["signupStep0", "error"], error);
    case CLEAR_SIGNUP_STEP_0_ERROR:
      return state.setIn(["signupStep0", "error"], undefined);
    case SET_SIGNUP_STEP_1_ERROR:
      return state.setIn(["signupStep1", "error"], error);
    case CLEAR_SIGNUP_STEP_1_ERROR:
      return state.setIn(["signupStep1", "error"], undefined);
    case SET_SIGNUP_STEP_3_ERROR:
      return state.setIn(["signupStep3", "error"], error);
    case CLEAR_SIGNUP_STEP_3_ERROR:
      return state.setIn(["signupStep3", "error"], undefined);

    case CLEAR_SIGNUP_STEPS:
      return state
        .set("signupStep0", initialState.get("signupStep0"))
        .set("signupStep1", initialState.get("signupStep1"))
        .set("signupStep2", initialState.get("signupStep2"))
        .set("signupStep3", initialState.get("signupStep3"));

    case CLEAR_CONFIRM_EMAIL:
      return state.set("confirmEmail", initialState.get("confirmEmail"));

    default:
      return state;
  }
}
