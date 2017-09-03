import { successResponse } from '../actions/quiz';
import responseHandler from './responseHandler'

const ReadApiCall = {
 getQuiz(userId) {
   makeApiCall('http://localhost:3000/users/'+userId+'/quiz')
 },

 getQuiz(quizId) {
  makeApiCall("http://localhost:3000/quiz/"+quizId+ "'")
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
