import store from '../store'

export default function (response, onSuccess) {
  if (response.status >= 200 && response.status < 300) {
    response.json().then(data => {
      if(!data.errors){
        store.dispatch(onSuccess(data));
      }
    });
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}
