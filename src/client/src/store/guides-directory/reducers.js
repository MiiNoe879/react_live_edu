import { fromJS } from "immutable";
import { FETCH_GUIDES_SUCCESS, FETCH_GUIDES_FAILURE } from "./constants";

const initialState = fromJS({
  items: undefined
});

export default function(state = initialState, action) {
  const { type, payload, error } = action;

  switch (type) {
    case FETCH_GUIDES_SUCCESS:
      return state.set("items", payload.results);
    case FETCH_GUIDES_FAILURE:
      return state.set("items", undefined);
    default:
      return state;
  }
}
