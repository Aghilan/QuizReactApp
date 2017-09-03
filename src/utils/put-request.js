import { updateSuccess } from '../actions/quiz';
import responseHandler from './responseHandler'

const UpdateApiCall = {
 upadateQuiz(quiz, id) {
   var request_path = 'http://localhost:3000/quiz/' +id
   fetch(request_path, {
     method: 'put',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(quiz),
   })
   .then(response => responseHandler(response, updateSuccess))
   .catch(error => { console.log('request failed', error); });
 },
};

export default UpdateApiCall;
