import {
  ME_PROJECTS_REQUEST,
  LOGIN_REQUEST,
  SET_LOGIN_FORM_ERROR,
  CLEAR_LOGIN_FORM_ERROR,
  LOGOUT_REQUEST,
  SIGNUP_REQUEST,
  SIGNUP_STEP_SET_USERNAME,
  SIGNUP_STEP_SET_ROLE,
  SIGNUP_STEP_SET_SKYPE,
  SIGNUP_STEP_SET_HANGOUTS,
  SIGNUP_STEP_SET_WANT_LEARN,
  CONFIRM_EMAIL_REQUEST,
  SOCIAL_APPS_REQUEST,
  SOCIAL_APPS_VALIDATE_REQUEST,
  SIGNUP_SOCIAL_REQUEST,
  CLEAR_SIGNUP_STEPS,
  CLEAR_SIGNUP_STEP_0_ERROR,
  CLEAR_SIGNUP_STEP_1_ERROR,
  SIGNUP_STEP_0_REQUEST,
  SIGNUP_STEP_1_REQUEST,
  SET_SIGNUP_STEP_3_ERROR,
  CLEAR_SIGNUP_STEP_3_ERROR,
  CLEAR_SIGNUP_SOCIAL_ERROR,
  CLEAR_SIGNUP_FORM_ERROR,
  PASSWORD_RESET_REQUEST,
  CLEAR_PASSWORD_RESET_ERROR,
  PASSWORD_RESET_CONFIRM_REQUEST,
  CLEAR_CONFIRM_EMAIL
} from "./constants";

export function fetchProjects(username) {
  return {
    type: ME_PROJECTS_REQUEST,
    payload: username
  };
}

export function logIn(username, password) {
  return {
    type: LOGIN_REQUEST,
    payload: { username, password }
  };
}

export function setLoginFormError(error) {
  return {
    type: SET_LOGIN_FORM_ERROR,
    error
  };
}

export function clearLoginFormError() {
  return {
    type: CLEAR_LOGIN_FORM_ERROR
  };
}

export function logOut() {
  return {
    type: LOGOUT_REQUEST
  };
}

export function signUp() {
  return {
    type: SIGNUP_REQUEST
  };
}

export function signUpStepSetUsername(username) {
  return {
    type: SIGNUP_STEP_SET_USERNAME,
    payload: username
  };
}

export function signUpStepSetRole(role) {
  return {
    type: SIGNUP_STEP_SET_ROLE,
    payload: role
  };
}

export function signUpStepSetSkype(skype) {
  return {
    type: SIGNUP_STEP_SET_SKYPE,
    payload: skype
  };
}

export function signUpStepSetHangouts(hangouts) {
  return {
    type: SIGNUP_STEP_SET_HANGOUTS,
    payload: hangouts
  };
}

export function signUpStepSetWantLearn(topics) {
  return {
    type: SIGNUP_STEP_SET_WANT_LEARN,
    payload: topics
  };
}

export function submitPasswordResetForm(email) {
  return {
    type: PASSWORD_RESET_REQUEST,
    payload: email
  };
}

export function submitPasswordResetConfirmForm(
  password,
  passwordConfirm,
  uid,
  token
) {
  return {
    type: PASSWORD_RESET_CONFIRM_REQUEST,
    payload: { password, passwordConfirm, uid, token }
  };
}

export function confirmEmail(key) {
  return {
    type: CONFIRM_EMAIL_REQUEST,
    payload: key
  };
}

export function signUpSocial() {
  return {
    type: SIGNUP_SOCIAL_REQUEST
  };
}

export function getSocialApps() {
  return {
    type: SOCIAL_APPS_REQUEST
  };
}

export function socialAppsValidate(network, access_token) {
  return {
    type: SOCIAL_APPS_VALIDATE_REQUEST,
    payload: { network, access_token }
  };
}

export function clearSignupSteps() {
  return {
    type: CLEAR_SIGNUP_STEPS
  };
}

export function clearConfirmEmail() {
  return {
    type: CLEAR_CONFIRM_EMAIL
  };
}

export function clearSignupStep0Error() {
  return {
    type: CLEAR_SIGNUP_STEP_0_ERROR
  };
}
export function clearSignupStep1Error() {
  return {
    type: CLEAR_SIGNUP_STEP_1_ERROR
  };
}
export function setSignupStep3Error(error) {
  return {
    type: SET_SIGNUP_STEP_3_ERROR,
    error
  };
}
export function clearSignupStep3Error() {
  return {
    type: CLEAR_SIGNUP_STEP_3_ERROR
  };
}

export function submitSignupStep0(email, password, passwordConfirm) {
  return {
    type: SIGNUP_STEP_0_REQUEST,
    payload: { email, password, passwordConfirm }
  };
}
export function submitSignupStep1(username) {
  return {
    type: SIGNUP_STEP_1_REQUEST,
    payload: { username }
  };
}

export function clearSignupSocialError() {
  return {
    type: CLEAR_SIGNUP_SOCIAL_ERROR
  };
}

export function clearSignupFormError() {
  return {
    type: CLEAR_SIGNUP_FORM_ERROR
  };
}

export function clearPasswordResetError() {
  return {
    type: CLEAR_PASSWORD_RESET_ERROR
  };
}
