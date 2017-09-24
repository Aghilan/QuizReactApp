import { UPDATE_IMAGE, DISPLAY_QUESTION, ADD_NEW_QUESTION } from '../constants';

export default function(state = '', action) {
  switch (action.type) {
    case UPDATE_IMAGE:
      return action.payload;
    case ADD_NEW_QUESTION: 
      return '';
    case DISPLAY_QUESTION:
      return action.payload.image;
    default:
      return state;
  }
}