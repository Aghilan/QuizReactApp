import { ADD_USER, ADD_USER_SUCCESS, ADD_NEW_QUIZ, LOG_OUT,
        AUTH_USER, AUTH_USER_SUCCESS, REMOVE_NEW_QUIZ } from '../constants';

import CreateApiCall from '../utils/add-request';

export default function(state = [], action) {
  var newState = {...state}
  switch (action.type) {
    case LOG_OUT:
      return {}
    case ADD_USER:
      CreateApiCall.newUser(action.payload);
      return state;
    case ADD_USER_SUCCESS:
      action.payload.new_quiz = false;
      return action.payload;
    case ADD_NEW_QUIZ:
      newState.new_quiz = true;
      return newState;
    case REMOVE_NEW_QUIZ:
      newState.new_quiz = false;
      return newState;
    case AUTH_USER:
      CreateApiCall.authUser(action.payload);
      return state;
    case AUTH_USER_SUCCESS:
      action.payload.new_quiz = false;
      return action.payload;
    default:
      return state;
  }
}
