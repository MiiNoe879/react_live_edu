import { OrderedMap, Map, fromJS } from "immutable";
import {
  FETCH_NON_EDU_PROJECTS_SUCCESS,
  FETCH_NON_EDU_PROJECTS_FAILURE
} from "./constants";

const initialState = fromJS({
  items: undefined,
  count: undefined
});

export default function(state = initialState, action) {
  const { type, payload, error } = action;

  switch (type) {
    case FETCH_NON_EDU_PROJECTS_SUCCESS:
      return state
        .set(
          "items",
          OrderedMap(payload.results.map(value => [value.id, Map(value)]))
        )
        .set("count", payload.count);
    case FETCH_NON_EDU_PROJECTS_FAILURE:
      return state.set("items", undefined).set("count", undefined);
    default:
      return state;
  }
}
