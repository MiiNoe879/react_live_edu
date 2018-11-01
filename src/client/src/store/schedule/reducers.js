import { OrderedMap, List, Map, fromJS } from "immutable";
import {
  FETCH_SCHEDULE_SUCCESS,
  FETCH_SCHEDULE_FAILURE,
  SCHEDULE_MODAL_SHOW,
  SCHEDULE_MODAL_HIDE
} from "./constants";

const initialState = fromJS({
  items: undefined,
  count: undefined,
  scheduleSubmitted: false
});

export default function(state = initialState, action) {
  const { type, payload, error } = action;

  switch (type) {
    case FETCH_SCHEDULE_SUCCESS:
      const items = List(
        Object.entries(payload.results).map(([key, value]) => {
          return Map({
            date: key,
            entries: OrderedMap(value.map(value => [value.id, Map(value)]))
          });
        })
      );
      return state.set("items", items).set("count", payload.count);
    case FETCH_SCHEDULE_FAILURE:
      return state.set("items", undefined).set("count", undefined);
    case SCHEDULE_MODAL_SHOW:
      return state.set("scheduleSubmitted", true);
    case SCHEDULE_MODAL_HIDE:
      return state.set("scheduleSubmitted", false);
    default:
      return state;
  }
}
