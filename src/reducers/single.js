import { DISPLAY_QUESTION, ADD_NEW_QUESTION } from '../constants';

export default function(state = {}, action) {
  var newState = {...state}
  switch (action.type) {
    case DISPLAY_QUESTION:
      return action.payload;
    case ADD_NEW_QUESTION:
      return {};
    default:
      return state;
  }
}