import { DISPLAY_QUESTION } from '../constants';

export default function(state = {}, action) {
  var newState = {...state}
  switch (action.type) {
    case DISPLAY_QUESTION:
      return action.payload;
    default:
      return state;
  }
}