import { FETCH_GUIDES_REQUEST } from "./constants";

export function fetchGuides(match, location) {
  return {
    type: FETCH_GUIDES_REQUEST,
    payload: { match, location }
  };
}
