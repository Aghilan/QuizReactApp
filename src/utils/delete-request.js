import { deleteSuccessResponse } from '../actions/quiz';
import store from '../store'

const DeleteApiCall = {
 deleteQuiz(quiz) {
   fetch('http://localhost:3000/quiz/' + quiz, {
     method: 'delete'
   })
   .then(response => {
     if (response.status >= 200 && response.status < 300) {
       response.json().then(data => {
         if(!data.errors){
           store.dispatch(deleteSuccessResponse(quiz));
        }
       });
     } else {
       const error = new Error(response.statusText);
       error.response = response;
       throw error;
     }
   })
   .catch(error => { console.log('request failed', error); });
 },
};

export default DeleteApiCall;
