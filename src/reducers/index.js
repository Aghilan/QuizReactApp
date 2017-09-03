import { combineReducers } from 'redux';
import question from './question';
import user from './user';

const allReducer = combineReducers({
  question,
  user
});

export default allReducer;
