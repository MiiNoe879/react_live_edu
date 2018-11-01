import { FETCH_NON_EDU_PROJECTS_REQUEST } from "./constants";

export function fetchNonEduProjects(match, location) {
  return {
    type: FETCH_NON_EDU_PROJECTS_REQUEST,
    payload: { match, location }
  };
}
