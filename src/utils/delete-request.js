import { deleteSuccessResponse } from '../actions/question';
import responseHandler from './responseHandler'

const DeleteApiCall = {
 deleteQuestions(question) {
 	console.log(request(JSON.stringify({"questions": question})));
 	fetch('http://localhost:3000/questions', request(JSON.stringify({"questions": question})))
   .then(response => responseHandler(response, deleteSuccessResponse))
   .catch(error => { console.log('request failed', error); });
 }
};

var request = (body) => {
  return {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body
  }
}
export default DeleteApiCall;
