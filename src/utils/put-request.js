import { updateSuccess } from '../actions/question';
import responseHandler from './responseHandler'

const UpdateApiCall = {
 upadateQuestion(question, id) {
   var request_path = 'http://localhost:3000/questions/' +id
   fetch(request_path, {
     method: 'put',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(question),
   })
   .then(response => responseHandler(response, updateSuccess))
   .catch(error => { console.log('request failed', error); });
 },
};

export default UpdateApiCall;
