import { OrderedMap, Map, fromJS } from "immutable";
import {
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_FAILURE,
  FETCH_FEATURED_PROJECTS_SUCCESS,
  FETCH_FEATURED_PROJECTS_FAILURE
} from "./constants";

const initialState = fromJS({
  items: undefined,
  count: undefined,
  itemsFeatured: undefined,
  countFeatured: undefined
});

export default function(state = initialState, action) {
  const { type, payload, error } = action;

  switch (type) {
    case FETCH_PROJECTS_SUCCESS:
      return state
        .set(
          "items",
          OrderedMap(payload.results.map(value => [value.id, Map(value)]))
        )
        .set("count", payload.count);
    case FETCH_PROJECTS_FAILURE:
      return state.set("items", undefined).set("count", undefined);
    case FETCH_FEATURED_PROJECTS_SUCCESS:
      return state
        .set(
          "itemsFeatured",
          OrderedMap(payload.results.map(value => [value.id, Map(value)]))
        )
        .set("countFeatured", payload.count);
    case FETCH_FEATURED_PROJECTS_FAILURE:
      return state
        .set("itemsFeatured", undefined)
        .set("countFeatured", undefined);
    default:
      return state;
  }
}
