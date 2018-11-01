import { isDevMode } from "utils/helpers";

export const getSignupFormData = state => {
  const data = {};

  data.email = state.auth.getIn(["signupStep0", "email"]);
  data.password1 = state.auth.getIn(["signupStep0", "password"]);
  data.password2 = state.auth.getIn(["signupStep0", "passwordConfirm"]);
  data.username = state.auth.getIn(["signupStep1", "username"]);
  data.user_role = state.auth.getIn(["signupStep2", "role"]);
  data.want_learn = state.auth.getIn(["signupStep3", "wantLearn"]);
  data.skype = state.auth.getIn(["signupStep3", "skype"]);
  data.hangouts = state.auth.getIn(["signupStep3", "hangouts"]);

  return data;
};

export const getSignupSocialFormData = state => {
  let data = {};

  data.username = state.auth.getIn(["signupStep1", "username"]);
  data.user_role = state.auth.getIn(["signupStep2", "role"]);
  data.want_learn = state.auth.getIn(["signupStep3", "wantLearn"]);
  data.skype = state.auth.getIn(["signupStep3", "skype"]);
  data.hangouts = state.auth.getIn(["signupStep3", "hangouts"]);
  data.network = state.auth.getIn(["signupSocial", "network"]);
  data.access_token = state.auth.getIn(["signupSocial", "access_token"]);

  return data;
};

export const getSocialAppsConfig = state => {
  const socialApps = state.auth.get("socialApps");
  let config = {};

  if (socialApps) {
    socialApps.forEach(el => {
      if (el.provider === "windowslive") {
        config.windows = el.client_id;
      } else if (el.provider === "linkedin_oauth2") {
        config.linkedin = el.client_id;
      } else if (el.provider === "twitch" && isDevMode) {
        // TODO: DEV ONLY, REMOVE ME
        config.twitch = "vrzbdrvphlftbfazhvdjh4he9v732s";
      } else {
        config[el.provider] = el.client_id;
      }
    });
    return config;
  } else {
    return socialApps;
  }
};
