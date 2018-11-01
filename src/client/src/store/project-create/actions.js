import { SET_ASSOCIATED_PROJECT_REQUEST } from "./constants";

export function createProject(url) {
  return {
    type: SET_ASSOCIATED_PROJECT_REQUEST,
    payload: url
  };
}
