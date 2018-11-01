import {
  FETCH_PROJECTS_REQUEST,
  FETCH_FEATURED_PROJECTS_REQUEST
} from "./constants";

export function fetchProjects(match, location) {
  return {
    type: FETCH_PROJECTS_REQUEST,
    payload: { match, location }
  };
}

export function fetchFeaturedProjects(match, location) {
  return {
    type: FETCH_FEATURED_PROJECTS_REQUEST,
    payload: { match, location }
  };
}
