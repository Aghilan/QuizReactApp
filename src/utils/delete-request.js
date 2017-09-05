import { deleteSuccessResponse } from '../actions/question';
import responseHandler from './responseHandler'

const DeleteApiCall = {
 deleteQuestion(question) {
   fetch('http://localhost:3000/questions/' + question, {
     method: 'delete'
   })
   .then(response => responseHandler(response, deleteSuccessResponse))
   .catch(error => { console.log('request failed', error); });
 }
};

export default DeleteApiCall;
