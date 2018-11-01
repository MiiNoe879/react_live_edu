import { OrderedMap, Map, fromJS } from "immutable";
import {
  FETCH_LIVE_PROJECTS_SUCCESS,
  FETCH_LIVE_PROJECTS_FAILURE,
  FETCH_UPCOMING_PROJECTS_SUCCESS,
  FETCH_UPCOMING_PROJECTS_FAILURE
} from "./constants";

const initialState = fromJS({
  items: undefined,
  count: undefined,
  itemsUpcoming: undefined,
  countUpcoming: undefined
});

export default function(state = initialState, action) {
  const { type, payload, error } = action;

  switch (type) {
    case FETCH_LIVE_PROJECTS_SUCCESS:
      return state
        .set(
          "items",
          OrderedMap(payload.results.map(value => [value.id, Map(value)]))
        )
        .set("count", payload.count);
    case FETCH_LIVE_PROJECTS_FAILURE:
      return state.set("items", undefined).set("count", undefined);
    case FETCH_UPCOMING_PROJECTS_SUCCESS:
      return state
        .set(
          "itemsUpcoming",
          OrderedMap(payload.results.map(value => [value.id, Map(value)]))
        )
        .set("countUpcoming", payload.count);
    case FETCH_UPCOMING_PROJECTS_FAILURE:
      return state
        .set("itemsUpcoming", undefined)
        .set("countUpcoming", undefined);
    default:
      return state;
  }
}
