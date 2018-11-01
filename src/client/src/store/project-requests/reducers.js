import { OrderedMap, Map, fromJS } from "immutable";
import {
  FETCH_PROJECT_REQUESTS_SUCCESS,
  FETCH_PROJECT_REQUESTS_FAILURE,
  PROJECT_REQUESTS_VOTE_SUCCESS,
  PROJECT_REQUESTS_MODAL_SHOW,
  PROJECT_REQUESTS_MODAL_HIDE
} from "./constants";

const initialState = fromJS({
  items: undefined,
  count: undefined,
  requestSubmitted: false
});

export default function(state = initialState, action) {
  const { type, payload, error } = action;

  switch (type) {
    case FETCH_PROJECT_REQUESTS_SUCCESS:
      return state
        .set(
          "items",
          OrderedMap(payload.results.map(value => [value.id, Map(value)]))
        )
        .set("count", payload.count);
    case FETCH_PROJECT_REQUESTS_FAILURE:
      return state.set("items", undefined);
    case PROJECT_REQUESTS_VOTE_SUCCESS:
      return state.setIn(
        ["items", payload.id],
        state.getIn(["items", payload.id]).merge(payload.data)
      );
    case PROJECT_REQUESTS_MODAL_SHOW:
      return state.set("requestSubmitted", true);
    case PROJECT_REQUESTS_MODAL_HIDE:
      return state.set("requestSubmitted", false);
    default:
      return state;
  }
}
