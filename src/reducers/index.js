import { combineReducers } from 'redux';
import question from './question';
import user from './user';
import single from './single';

const allReducer = combineReducers({
  question,
  single,
  user
});

export default allReducer;
