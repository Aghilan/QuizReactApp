import { ADD_USER , ADD_USER_SUCCESS, ADD_NEW_QUESTION, LOG_OUT,
        AUTH_USER, AUTH_USER_SUCCESS, REMOVE_NEW_QUESTION } from '../constants';


export function addNewQuestion() {
  return { type: ADD_NEW_QUESTION }
}

export function removeNewQuestion(){
  console.log("Remove Question")
  return { type: REMOVE_NEW_QUESTION }
}

export function logOut(){
  return {type: LOG_OUT}
}
