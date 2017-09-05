import { successResponse } from '../actions/question';
import responseHandler from './responseHandler'

const ReadApiCall = {
 getAllQuestion() {
  makeApiCall("http://localhost:3000/questions");
 }
};

const makeApiCall = (path) => {
  return fetch(path, {
    method: 'get',
  })
  .then(response => responseHandler(response, successResponse))
  .catch(error => { console.log('request failed', error); });
}

export default ReadApiCall;
