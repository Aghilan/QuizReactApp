import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import allReducer from './reducers';


/*
Store creation with Middleware to perform asyn tasks like network calls
*/
export default compose(
  applyMiddleware(thunk)
)(createStore)(allReducer);
