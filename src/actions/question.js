import { SUCCESS, ADD_SUCCESS, ADD_QUESTION, GET_ALL_QUESTIONS,
        DELETE_QUESTION, DELETE_SUCCESS, UPDATE_SUCCESS,
        UPDATE_QUESTION ,FLIP_EDITABLE, FILTER_QUESTION,
        FILTER_SUCCESS, DISPLAY_QUESTION} from '../constants';

export function successResponse(response) {
  return { payload: response, type: SUCCESS };
}

export function addSuccess(response) {
  return { payload: response, type: ADD_SUCCESS };
}

export function addQuestion (question) {
  return { payload: question, type: ADD_QUESTION }
}

export function getAllQuestions () {
  return { type: GET_ALL_QUESTIONS }
}

export function deleteQuestion(questionId){
  return { payload: questionId, type: DELETE_QUESTION}
}

export function deleteSuccessResponse(questionId){
  return { payload: questionId, type: DELETE_SUCCESS }
}

export function updateQuestion(question, questionId){
  return { payload: question, id: questionId, type: UPDATE_QUESTION}
}

export function updateSuccess(question){
  return { payload: question, type: UPDATE_SUCCESS}
}

export function makeEditable(question){
  return {payload: question, type: FLIP_EDITABLE}
}

export function displayQuestion (question) {
  return { type: DISPLAY_QUESTION, payload: question }
}
