import { fromJS } from "immutable";
import { SET_ASSOCIATED_PROJECT_REQUEST } from "./constants";

const initialState = fromJS({
  associatedProjectRequest: undefined
});

export default function(state = initialState, action) {
  const { type, payload, error } = action;

  switch (type) {
    case SET_ASSOCIATED_PROJECT_REQUEST:
      return state.set("associatedProjectRequest", payload);
    default:
      return state;
  }
}
