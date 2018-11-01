import { fromJS } from "immutable";
import {
  TOPICS_SUCCESS,
  TOPICS_FAILURE,
  TOPICS_HIERARCHY_SUCCESS,
  TOPICS_HIERARCHY_FAILURE
} from "./constants";

const initialState = fromJS({
  topics: null,
  topicsHierarchy: null
});

export default function(state = initialState, action) {
  const { type, payload, error } = action;
  switch (type) {
    case TOPICS_SUCCESS:
      return state.set("topics", payload);
    case TOPICS_FAILURE:
      return state.set("topics", null);
    case TOPICS_HIERARCHY_SUCCESS:
      return state.set("topicsHierarchy", payload);
    case TOPICS_HIERARCHY_FAILURE:
      return state.set("topicsHierarchy", null);
    default:
      return state;
  }
}
