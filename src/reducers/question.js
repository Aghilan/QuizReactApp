import { ADD_QUESTION, ADD_SUCCESS, SUCCESS, GET_ALL_QUESTION,
        DELETE_QUESTION, UPDATE_QUESTION, UPDATE_SUCCESS, LOG_OUT,
        FLIP_EDITABLE ,DELETE_SUCCESS, FILTER_QUESTION, FILTER_SUCCESS} from '../constants';

import CreateApiCall from '../utils/add-request';
import ReadApiCall from '../utils/get-request';
import DeleteApiCall from '../utils/delete-request'
import UpdateApiCall from '../utils/put-request'
// import FilterApiCall from '../utils/filter-request'

export default function(state = [], action) {
  var newState = [...state];
  switch (action.type) {
    case LOG_OUT:
      return [];
    case ADD_QUESTION:
      CreateApiCall.newQuestion(action.payload, action.userId);
      return state;
    case FILTER_SUCCESS:
      action.payload.map((question) => {
        question.editable = false;
        return question;
      })
      return action.payload
    case ADD_SUCCESS:
      return [...state, action.payload];
    case SUCCESS:
      if(state.length === 0){
        action.payload.map((question) => {
          question.editable = false;
          return question;
        })
        return action.payload
      }
      return [...state,action.payload]
    case GET_ALL_QUESTION:
      ReadApiCall.getQuestion(action.payload);
      return state;
    case UPDATE_SUCCESS:
      action.payload.editable =false;
      newState.map((question,idx) => {
        if(question._id === action.payload._id){
          newState.splice(idx, 1,action.payload);
        }
        return question;
      })
      return newState
    case DELETE_SUCCESS:
      newState.map((question,idx) => {
          if(question._id === action.payload){
            newState.splice(idx, 1);
          }
          return question;
        })
      return newState;
    case DELETE_QUESTION:
      DeleteApiCall.deleteQuestion(action.payload)
      return state;
    case UPDATE_QUESTION:
      UpdateApiCall.upadateQuestion(action.payload, action.id)
      return state;
    case FILTER_QUESTION:
      // FilterApiCall.filterQuestion(action.payload, action.userId);
      return state;
    case FLIP_EDITABLE:
      newState.map((question) => {
          if(question._id === action.payload){
            question.editable = !question.editable;
          }
          else{
            question.editable = false;
          }
          return question;
      })
      return newState;
    default:
      return state;
  }
}
