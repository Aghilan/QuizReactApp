import { ADD_USER , ADD_USER_SUCCESS, ADD_NEW_BOOKMARK, LOG_OUT,
        AUTH_USER, AUTH_USER_SUCCESS, REMOVE_NEW_BOOKMARK } from '../constants';


export function addUser(user) {
  return { payload: user, type: ADD_USER }
}

export function addUserSuccess(user) {
  return {payload: user, type: ADD_USER_SUCCESS }
}

export function addNewBookmark() {
  return { type: ADD_NEW_BOOKMARK }
}

export function removeNewBookmark(){
  console.log("Remove Bookmark")
  return { type: REMOVE_NEW_BOOKMARK }
}

export function authUser(user) {
  return {payload: user, type: AUTH_USER};
}

export function authUserSuccess(user) {
  return {payload: user, type: AUTH_USER_SUCCESS};
}

export function logOut(){
  return {type: LOG_OUT}
}
