import { addSuccess } from '../actions/question';
import responseHandler from './responseHandler'

const CreateApiCall = {

  newQuestion(question) {
   fetch('http://localhost:3000/questions', request(JSON.stringify(question)))
   .then(response => responseHandler(response, addSuccess))
   .catch(error => { console.log('request failed', error); });
  },
};

var request = (body) => {
  return {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body
  }
}
export default CreateApiCall;
