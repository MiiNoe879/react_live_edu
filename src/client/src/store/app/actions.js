import { TOPICS_REQUEST, TOPICS_HIERARCHY_REQUEST } from "store/app/constants";

export function fetchTopics() {
  return {
    type: TOPICS_REQUEST
  };
}

export function fetchTopicsHierarchy() {
  return {
    type: TOPICS_HIERARCHY_REQUEST
  };
}
