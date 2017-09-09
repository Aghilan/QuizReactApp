import { DISPLAY_QUESTION, ADD_NEW_QUESTION, ADD_OPTION, DELETE_OPTION } from '../constants';

export default function(state = {}, action) {
  var newState = {...state}
  switch (action.type) {
    case DISPLAY_QUESTION:
      return action.payload;
    case ADD_NEW_QUESTION:
      return {};
    case ADD_OPTION: 
    	newState.options.push('New Option')
    	return newState;
    case DELETE_OPTION: 
      newState.options.splice(action.payload,1);
      return newState;
    default:
      return state;
  }
}