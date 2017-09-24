import { ADD_QUESTION, ADD_SUCCESS, SUCCESS, GET_ALL_QUESTIONS,
        DELETE_QUESTIONS, UPDATE_QUESTION, UPDATE_SUCCESS,
        FLIP_DELETION ,DELETE_SUCCESS, UPDATE_QUEST, UPDATE_TITLE} from '../constants';

import CreateApiCall from '../utils/add-request';
import ReadApiCall from '../utils/get-request';
import DeleteApiCall from '../utils/delete-request';
import UpdateApiCall from '../utils/put-request';

export default function (state = [], action) {
  var newState = [...state];
  switch (action.type) {
    case ADD_QUESTION:
      CreateApiCall.newQuestion(action.payload);
      return state;
    case ADD_SUCCESS:
      return [...state, action.payload];
    case SUCCESS:
      if (state.length === 0) {
        action.payload.map((question) => {
          question.deletable = false;
          return question;
        });
        return action.payload;
      }
      return [...state,action.payload];
    case GET_ALL_QUESTIONS:
      ReadApiCall.getAllQuestion();
      return state;
    case UPDATE_SUCCESS:
      action.payload.deletable =false;
      newState.map((question,idx) => {
        if(question._id === action.payload._id){
          newState.splice(idx, 1,action.payload);
        }
        return question;
      });
      return newState;
    case DELETE_SUCCESS:
      var newState = [];
      state.map((question) =>  {
          if(action.payload.indexOf(question._id) < 0){
            newState.push(question);
          }
          return question;
        });


      return newState;
    case DELETE_QUESTIONS:
      DeleteApiCall.deleteQuestions(action.payload);
      return state;
    case UPDATE_QUESTION:
      UpdateApiCall.upadateQuestion(action.payload, action.id);
      return state;
    case FLIP_DELETION:
      newState.map((question) => {
        question.deletable = !question.deletable;
        return question;
      });
      return newState;
    case UPDATE_QUEST:
      newState.map((question) => {
        if(question._id === action.payloadIndex) {
          question.question = action.payload;
        }
        return question;
      });
      return newState;
    case UPDATE_TITLE:
      newState.map((question) => {
        if(question._id === action.payloadIndex) {
          question.title = action.payload;
        }
        return question;
      });
      return newState;
    default:
      return state;
  }
}
