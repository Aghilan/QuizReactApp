import { DISPLAY_QUESTION, ADD_NEW_QUESTION, ADD_OPTION, DELETE_OPTION,
        UPDATE_TITLE, UPDATE_QUEST,UPDATE_OPTION } from '../constants';

var defaultState = {
  title: '',
  question: '',
  options: [],
  image: ''
};

export default function(state = defaultState, action) {
  var newState = {...state};
  switch (action.type) {
    case DISPLAY_QUESTION:
      return action.payload;
    case ADD_NEW_QUESTION:
      return defaultState;
    case ADD_OPTION:
      if(newState.options.length >= 6) {
        alert('A question cannot have more than 6 options');
        return newState;
      }
    	newState.options.push('Option '+ (newState.options.length+1));
      return newState;
    case DELETE_OPTION:
      if( newState.options.length <= 2 ) {
        alert('A question should have atleast 2 options');
        return newState;
      }
      newState.options.splice(action.payload,1);
      return newState;
    case UPDATE_TITLE: 
      newState.title = action.payload;
      return newState;
    case UPDATE_QUEST:
      newState.question = action.payload;
      return newState;
    case UPDATE_OPTION:
      newState.options[action.payloadIndex] = action.payload;
      return newState;
    default:
      return state;
  }
}