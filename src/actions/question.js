import { SUCCESS, ADD_SUCCESS, ADD_QUESTION, GET_ALL_QUESTIONS,
        DELETE_QUESTIONS, DELETE_SUCCESS, UPDATE_SUCCESS,
        UPDATE_QUESTION ,FLIP_DELETION, FILTER_QUESTION,
        FILTER_SUCCESS, DISPLAY_QUESTION, ADD_NEW_QUESTION } from '../constants';

export function successResponse(response) {
  return { payload: response, type: SUCCESS };
}

export function addNewQuestion() {
  return { type: ADD_NEW_QUESTION }
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

export function deleteQuestions(questionId){
  return { payload: questionId, type: DELETE_QUESTIONS}
}

export function deleteSuccessResponse(questionIds){
  return { payload: questionIds, type: DELETE_SUCCESS }
}

export function updateQuestion(question, questionId){
  return { payload: question, id: questionId, type: UPDATE_QUESTION}
}

export function updateSuccess(question){
  return { payload: question, type: UPDATE_SUCCESS}
}

export function makeDeletable(question){
  return { type: FLIP_DELETION }
}

export function displayQuestion (question) {
  return { type: DISPLAY_QUESTION, payload: question }
}
