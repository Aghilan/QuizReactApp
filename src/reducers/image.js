import { UPDATE_IMAGE, DISPLAY_QUESTION} from '../constants';

export default function(state = null, action) {
  var newState = {...state}
  switch (action.type) {
    case UPDATE_IMAGE:
      return action.payload;
     case DISPLAY_QUESTION:
      return action.payload.image;
    default:
      return state;
  }
}